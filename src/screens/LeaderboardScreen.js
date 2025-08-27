import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';
import { fetchLiveLeaderboard, fetchDemoLeaderboard, fetchFinishedEvents } from '../services/api';

const LeaderboardScreen = () => {
  const [selectedTab, setSelectedTab] = useState('ranking');

  const [batchRankings, setBatchRankings] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [scorecardSearchQuery, setScorecardSearchQuery] = useState('');
  const [scorecardSortBy, setScorecardSortBy] = useState('date'); // 'date' | 'name' | 'winner'

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        // Fetch leaderboard and finished events concurrently
        const [lbRaw, finished] = await Promise.all([
          fetchLiveLeaderboard().catch(() => fetchDemoLeaderboard()),
          fetchFinishedEvents().catch(() => []),
        ]);

        // Normalize finished events map by id for quick lookup
        const finishedEvents = Array.isArray(finished) ? finished : [];
        const finishedById = finishedEvents.reduce((acc, ev) => {
          if (ev && ev._id) acc[ev._id] = ev;
          return acc;
        }, {});

        // Build rankings
        let mapped = [];
        if (Array.isArray(lbRaw)) {
          mapped = (lbRaw || []).map((row, idx) => ({
            batch: row.batch || row.team || `Team ${idx + 1}`,
            points: row.points || row.score || 0,
            position: row.position || row.rank || idx + 1,
            events: row.eventsCount || (row.events ? row.events.length : 0),
            wins: row.wins || 0,
          }));
        } else if (lbRaw && typeof lbRaw === 'object') {
          // Compute events and wins from available data
          const totalEvents = Array.isArray(lbRaw.EventId) ? lbRaw.EventId.length : 0;
          const winners = finishedEvents.map((e) => e?.winners).filter(Boolean);

          const teams = ['E21', 'E22', 'E23', 'E24', 'Staff'];
          const candidates = teams.map((team) => ({
            batch: team,
            points: Number(lbRaw[`${team}Points`] || 0),
            events: totalEvents,
            wins: winners.filter((w) => w === team).length,
          }));

          mapped = candidates
            .sort((a, b) => b.points - a.points)
            .map((row, idx) => ({ ...row, position: idx + 1 }));
        }
        setBatchRankings(mapped);

        // Build scorecards from leaderboard per-event arrays (if present),
        // otherwise fall back to finished events basic info
        let scorecards = [];
        if (lbRaw && typeof lbRaw === 'object' && Array.isArray(lbRaw.EventId)) {
          scorecards = lbRaw.EventId.map((eventId, idx) => {
            const evFromLB = {
              id: eventId,
              name: Array.isArray(lbRaw.EventName) ? lbRaw.EventName[idx] : undefined,
              date: undefined,
              winner: undefined,
              scores: [
                { batch: 'E21', score: Array.isArray(lbRaw.E21) ? lbRaw.E21[idx] : undefined },
                { batch: 'E22', score: Array.isArray(lbRaw.E22) ? lbRaw.E22[idx] : undefined },
                { batch: 'E23', score: Array.isArray(lbRaw.E23) ? lbRaw.E23[idx] : undefined },
                { batch: 'E24', score: Array.isArray(lbRaw.E24) ? lbRaw.E24[idx] : undefined },
                { batch: 'Staff', score: Array.isArray(lbRaw.Staff) ? lbRaw.Staff[idx] : undefined },
              ].filter((s) => typeof s.score === 'number')
               .sort((a, b) => (b.score || 0) - (a.score || 0)),
            };

            const evFull = finishedById[eventId] || {};
            return {
              id: eventId,
              name: evFromLB.name || evFull.title || 'Event',
              date: evFull.date || Date.now(),
              winner: evFull.winners || (evFromLB.scores[0]?.batch ?? '—'),
              scores: evFromLB.scores,
            };
          });
        } else if (finishedEvents.length) {
          scorecards = finishedEvents.map((ev) => ({
            id: ev._id,
            name: ev.title,
            date: ev.date,
            winner: ev.winners || '—',
            scores: [],
          }));
        }

        setPastEvents(scorecards);
      } catch (error) {
        console.warn('Leaderboard load error', error?.message || error);
      }
    };
    loadLeaderboard();
  }, []);



  const getDisplayedScorecards = () => {
    const query = scorecardSearchQuery.trim().toLowerCase();
    const filtered = pastEvents.filter((ev) => {
      if (!query) return true;
      const name = String(ev?.name || '').toLowerCase();
      const winner = String(ev?.winner || '').toLowerCase();
      const dateStr = ev?.date ? new Date(ev.date).toLocaleDateString().toLowerCase() : '';
      return (
        name.includes(query) ||
        winner.includes(query) ||
        dateStr.includes(query)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (scorecardSortBy === 'name') {
        return String(a.name || '').localeCompare(String(b.name || ''));
      }
      if (scorecardSortBy === 'winner') {
        return String(a.winner || '').localeCompare(String(b.winner || ''));
      }
      const ad = a?.date ? new Date(a.date).getTime() : 0;
      const bd = b?.date ? new Date(b.date).getTime() : 0;
      return bd - ad; // newest first
    });

    return sorted;
  };

  const renderScorecardSearchAndSort = () => (
    <View style={styles.searchSortContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.GRAY_MEDIUM} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search scorecards..."
          placeholderTextColor={COLORS.GRAY_MEDIUM}
          value={scorecardSearchQuery}
          onChangeText={setScorecardSearchQuery}
        />
        {scorecardSearchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setScorecardSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close" size={20} color={COLORS.GRAY_MEDIUM} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort:</Text>
        <TouchableOpacity
          style={[styles.sortButton, scorecardSortBy === 'date' && styles.sortButtonActive]}
          onPress={() => setScorecardSortBy('date')}
        >
          <Text style={[styles.sortButtonText, scorecardSortBy === 'date' && styles.sortButtonTextActive]}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, scorecardSortBy === 'name' && styles.sortButtonActive]}
          onPress={() => setScorecardSortBy('name')}
        >
          <Text style={[styles.sortButtonText, scorecardSortBy === 'name' && styles.sortButtonTextActive]}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, scorecardSortBy === 'winner' && styles.sortButtonActive]}
          onPress={() => setScorecardSortBy('winner')}
        >
          <Text style={[styles.sortButtonText, scorecardSortBy === 'winner' && styles.sortButtonTextActive]}>Winner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'ranking' && styles.activeTab]}
        onPress={() => setSelectedTab('ranking')}
      >
        <Text style={[styles.tabText, selectedTab === 'ranking' && styles.activeTabText]}>
          Rankings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'scorecards' && styles.activeTab]}
        onPress={() => setSelectedTab('scorecards')}
      >
        <Text style={[styles.tabText, selectedTab === 'scorecards' && styles.activeTabText]}>
          Score Cards
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderRankingRow = (item, index) => (
    <View key={item.batch} style={styles.rankingRow}>
      <View style={[styles.rankPill, index < 3 && styles.rankPillTop]}>
        <Text style={[styles.rankPillText, index < 3 && styles.rankPillTextTop]}>#{item.position}</Text>
      </View>
      <View style={styles.rowLogoWrap}>
        {getBatchLogo(item.batch) ? (
          <Image source={getBatchLogo(item.batch)} style={styles.rowLogo} resizeMode="cover" />
        ) : (
          <View style={[styles.rowLogo, { alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.GRAY_LIGHT }]}>
            <Text style={{ fontWeight: '800' }}>{getInitials(item.batch)}</Text>
          </View>
        )}
      </View>
      <View style={styles.rowCenter}>
        <Text style={styles.batchName}>{item.batch}</Text>
        <Text style={styles.batchStats}>{item.events} events • {item.wins} wins</Text>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsValue}>{item.points}</Text>
        <Text style={styles.pointsLabel}>pts</Text>
      </View>
    </View>
  );

  const getInitials = (text) => {
    if (!text) return '?';
    const clean = String(text).trim();
    if (clean.length <= 3) return clean.toUpperCase();
    const parts = clean.split(/\s|-/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const getBatchLogo = (batch) => {
    const key = String(batch || '').toUpperCase();
    try {
      if (key.includes('E21')) return require('../../assets/e21.jpg');
      if (key.includes('E22')) return require('../../assets/e22.png');
      if (key.includes('E23')) return require('../../assets/e23.png');
      if (key.includes('E24')) return require('../../assets/e24.png');
      if (key.includes('Staff')) return require('../../assets/staff.png');
    } catch (e) {}
    return null;
  };

  const renderPodium = () => {
    if (!batchRankings || batchRankings.length === 0) return null;
    const [first, second, third] = [batchRankings[0], batchRankings[1], batchRankings[2]];
    return (
      <LinearGradient colors={GRADIENTS.DARK} style={styles.podiumCard}>
        <View style={styles.podiumHeader}>
          <View style={styles.headerLeft}>
            <Ionicons name="planet" size={18} color={COLORS.ACCENT} />
            <Text style={styles.podiumTitle}>Odyssey Leaderboard</Text>
          </View>
          <View style={styles.countdownChip}>
            <Ionicons name="time" size={14} color={COLORS.PRIMARY_WHITE} />
            <Text style={styles.countdownText}>06d 23h 00m</Text>
          </View>
        </View>
        <View style={styles.podiumWrap}>
          {second && (
            <View style={styles.podiumColumn}>
              <View style={[styles.avatarCircle, { backgroundColor: '#C0C0C022' }]}>
                {getBatchLogo(second.batch) ? (
                  <Image source={getBatchLogo(second.batch)} style={styles.avatarImg} resizeMode="cover" />
                ) : (
                  <Text style={styles.avatarText}>{getInitials(second.batch)}</Text>
                )}
              </View>
              <Text style={styles.podiumName}>{second.batch}</Text>
              <View style={styles.pointsChipSilver}>
                <Text style={styles.pointsChipText}>{second.points} QP</Text>
              </View>
              <View style={[styles.podiumPlatform, styles.podiumPlatformSecond]}>
                <Text style={styles.platformPlace}>2</Text>
              </View>
            </View>
          )}
          {first && (
            <View style={styles.podiumColumn}>
              <View style={[styles.crown, { backgroundColor: COLORS.ACCENT }]} />
              <View style={[styles.avatarCircle, { backgroundColor: '#FFD70022' }]}>
                {getBatchLogo(first.batch) ? (
                  <Image source={getBatchLogo(first.batch)} style={styles.avatarImg} resizeMode="cover" />
                ) : (
                  <Text style={styles.avatarText}>{getInitials(first.batch)}</Text>
                )}
              </View>
              <Text style={styles.podiumName}>{first.batch}</Text>
              <View style={styles.pointsChipGold}>
                <Text style={styles.pointsChipText}>{first.points} QP</Text>
              </View>
              <View style={[styles.podiumPlatform, styles.podiumPlatformFirst]}>
                <Text style={styles.platformPlace}>1</Text>
              </View>
            </View>
          )}
          {third && (
            <View style={styles.podiumColumn}>
              <View style={[styles.avatarCircle, { backgroundColor: '#CD7F3222' }]}>
                {getBatchLogo(third.batch) ? (
                  <Image source={getBatchLogo(third.batch)} style={styles.avatarImg} resizeMode="cover" />
                ) : (
                  <Text style={styles.avatarText}>{getInitials(third.batch)}</Text>
                )}
              </View>
              <Text style={styles.podiumName}>{third.batch}</Text>
              <View style={styles.pointsChipBronze}>
                <Text style={styles.pointsChipText}>{third.points} QP</Text>
              </View>
              <View style={[styles.podiumPlatform, styles.podiumPlatformThird]}>
                <Text style={styles.platformPlace}>3</Text>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    );
  };

  const renderEventScoreCard = (event) => (
    <View key={event.id} style={styles.scoreCard}>
      <View style={styles.scoreCardHeader}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.winnerBadge}>
        <Ionicons name="trophy" size={16} color={COLORS.PRIMARY_WHITE} />
        <Text style={styles.winnerText}>Winner: {event.winner}</Text>
      </View>
      
      <View style={styles.scoresList}>
        {event.scores.map((score, index) => (
          <View key={score.batch} style={styles.scoreItem}>
            <View style={styles.scoreRank}>
              <Text style={styles.scoreRankText}>{index + 1}</Text>
            </View>
            <Text style={styles.scoreBatch}>{score.batch}</Text>
            <Text style={styles.scoreValue}>{score.score}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.groupView}>

        {renderTabs()}

        {selectedTab === 'ranking' && (
          <View style={styles.section}>
            {renderPodium()}
            <View style={styles.rankingsListContainer}>
              {batchRankings.slice(3).map((item, index) => renderRankingRow(item, index + 3))}
            </View>
          </View>
        )}

        {selectedTab === 'scorecards' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text" size={24} color={COLORS.PRIMARY_RED} />
              <Text style={styles.sectionTitle}>Past Event Score Cards</Text>
            </View>


            {renderScorecardSearchAndSort()}
              <View style={styles.groupView}>
            <View style={styles.scoreCardsContainer}>
              {getDisplayedScorecards().map(event => renderEventScoreCard(event))}
            </View>
              </View>
          </View>
        )}
          </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    groupView: {
        marginBottom:120,
    },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  // Podium styles
  podiumCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    ...SHADOWS.MEDIUM,
  },
  podiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  podiumTitle: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  countdownChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
  },
  countdownText: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: '600',
    fontSize: 12,
  },
  podiumWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  podiumColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  crown: {
    width: 18,
    height: 18,
    borderRadius: 4,
    marginBottom: 6,
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginBottom: 8,
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    padding: 10,
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  avatarText: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: '800',
  },
  podiumName: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: '700',
    marginBottom: 6,
  },
  pointsChipGold: {
    backgroundColor: 'rgba(255,215,0,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.45)',
  },
  pointsChipSilver: {
    backgroundColor: 'rgba(192,192,192,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(192,192,192,0.45)',
  },
  pointsChipBronze: {
    backgroundColor: 'rgba(205,127,50,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(205,127,50,0.45)',
  },
  pointsChipText: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: '700',
    fontSize: 12,
  },
  podiumPlatform: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  podiumPlatformFirst: {
    height: 96,
  },
  podiumPlatformSecond: {
    height: 76,
  },
  podiumPlatformThird: {
    height: 64,
  },
  platformPlace: {
    color: COLORS.PRIMARY_WHITE,
    fontWeight: '800',
    marginBottom: 6,
  },
  linkCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.MEDIUM,
  },
  linkCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  linkText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    ...SHADOWS.LIGHT,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.PRIMARY_RED,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_DARK,
  },
  activeTabText: {
    color: COLORS.PRIMARY_WHITE,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginLeft: 12,
  },
  rankingsListContainer: {
    gap: 10,
  },
  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...SHADOWS.LIGHT,
  },
  rankPill: {
    width: 36,
    height: 28,
    borderRadius: 15,
    backgroundColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankPillTop: {
    backgroundColor: COLORS.PRIMARY_RED,
  },
  rankPillText: {
    color: COLORS.PRIMARY_DARK,
    fontWeight: '700',
  },
  rankPillTextTop: {
    color: COLORS.PRIMARY_WHITE,
  },
  rowLogoWrap: {
    marginRight: 10,
  },
  rowLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  rowCenter: {
    flex: 1,
  },
  batchInfo: {
    flex: 1,
  },
  batchName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 4,
  },
  batchStats: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
  },
  pointsContainer: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_RED,
  },
  pointsLabel: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
  },
  trophyIcon: {
    marginLeft: 8,
  },
  scoreCardsContainer: {
    gap: 16,
  },
  searchSortContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    ...SHADOWS.LIGHT,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: COLORS.PRIMARY_DARK,
  },
  clearButton: {
    marginLeft: 8,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  sortLabel: {
    marginRight: 8,
    color: COLORS.GRAY_DARK,
    fontWeight: '600',
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.GRAY_LIGHT,
    marginRight: 8,
  },
  sortButtonActive: {
    backgroundColor: COLORS.PRIMARY_RED,
  },
  sortButtonText: {
    color: COLORS.PRIMARY_DARK,
    fontWeight: '600',
  },
  sortButtonTextActive: {
    color: COLORS.PRIMARY_WHITE,
  },
  scoreCard: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.LIGHT,
  },
  scoreCardHeader: {
    marginBottom: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
  },
  winnerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_RED,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  winnerText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  scoresList: {
    gap: 8,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  scoreRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.GRAY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scoreRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
  },
  scoreBatch: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    flex: 1,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_RED,
  },
});

export default LeaderboardScreen;
