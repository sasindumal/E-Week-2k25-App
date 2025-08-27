import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';
import EventRegistrationModal from '../components/EventRegistrationModal';
import { fetchUpcomingEvents, fetchLiveEvents, fetchFinishedEvents, fetchEvents, registerForEvent, fetchLiveLeaderboard, fetchDemoLeaderboard } from '../services/api';

const EventsScreen = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState('schedule');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, name, location
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const [weekSchedule, setWeekSchedule] = useState([]);

  const POLL_MS = 30000;

  const buildSchedule = (allEvents) => {
    const days = [];
    // Fixed 7-day schedule: Aug 30 to Sep 5, 2025
    const startDate = new Date(2025, 7, 30); // August is month index 7
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateKey = d.toISOString().slice(0, 10);
      const dayLabel = d.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();
      const eventsForDay = (allEvents || [])
        .filter((ev) => {
          const evDate = new Date(ev.date);
          const evKey = evDate.toISOString().slice(0, 10);
          return evKey === dateKey;
        })
        .map((ev) => ({
          time: ev.time || '',
          title: ev.title,
          location: ev.location,
          type: (ev.category || ev.eventType || 'other').toString().toLowerCase(),
        }))
        .sort((a, b) => (a.time || '').localeCompare(b.time || ''));

      days.push({ date: dateKey, day: dayLabel, events: eventsForDay });
    }
    return days;
  };

  const [ongoingEvents, setOngoingEvents] = useState([]);

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [pastEvents, setPastEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'ceremony': return COLORS.PRIMARY_RED;
      case 'competition': return '#FF6B35';
      case 'esports': return '#9B59B6';
      case 'workshop': return '#3498DB';
      case 'cultural': return '#E67E22';
      case 'finals': return '#E74C3C';
      default: return COLORS.GRAY_DARK;
    }
  };

  const handleRegisterPress = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = async (registrationData) => {
    try {
      const payload = {
        eventId: registrationData.id || selectedEvent?.id,
        teamName: registrationData.teamName || `${registrationData.eventName} Team`,
        members: registrationData.members || [],
      };
      const resp = await registerForEvent(payload);
      Alert.alert('Registration', resp?.message || 'Registration submitted', [{ text: 'OK' }]);
    } catch (e) {
      Alert.alert('Registration Failed', e?.message || 'Please try again later');
    } finally {
      setShowRegistrationModal(false);
    }
  };

  useEffect(() => {
    let pollId;
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const [upcoming, live, finished, all, lbRaw] = await Promise.all([
          fetchUpcomingEvents(),
          fetchLiveEvents(),
          fetchFinishedEvents(),
          fetchEvents(),
          fetchLiveLeaderboard().catch(() => fetchDemoLeaderboard()),
        ]);

        const normalize = (e) => ({
          id: e._id || e.id,
          title: e.title,
          date: e.date,
          time: e.time,
          location: e.location,
          registrationOpen: e.status === 'upcoming',
          slots: e.maxTeamsPerBatch || 0,
          filled: 0,
          status: e.status,
          winners: e.winners,
          firstRunnerUp: e.firstRunnerUp,
          secondRunnerUp: e.secondRunnerUp,
          thirdRunnerUp: e.thirdRunnerUp,
        });

        setUpcomingEvents((upcoming || []).map(normalize));
        setOngoingEvents((live || []).map(normalize));

        // Enhance past events with leaderboard scorecards if available
        let enhancedPast = (finished || []).map(normalize);

        if (lbRaw && typeof lbRaw === 'object' && Array.isArray(lbRaw.EventId)) {
          const makeScores = (idx) => [
            { batch: 'E21', score: Array.isArray(lbRaw.E21) ? lbRaw.E21[idx] : undefined },
            { batch: 'E22', score: Array.isArray(lbRaw.E22) ? lbRaw.E22[idx] : undefined },
            { batch: 'E23', score: Array.isArray(lbRaw.E23) ? lbRaw.E23[idx] : undefined },
            { batch: 'E24', score: Array.isArray(lbRaw.E24) ? lbRaw.E24[idx] : undefined },
          ].filter((s) => typeof s.score === 'number')
           .sort((a, b) => (b.score || 0) - (a.score || 0));

          const byId = {};
          lbRaw.EventId.forEach((eventId, idx) => {
            byId[String(eventId)] = makeScores(idx);
          });

          enhancedPast = enhancedPast.map((ev) => {
            const scores = byId[String(ev.id)] || [];
            const winner = ev.winners || (scores[0]?.batch ?? undefined);
            return { ...ev, scores, winner };
          });
        } else {
          // Ensure winner field aligns with render function
          enhancedPast = enhancedPast.map((ev) => ({ ...ev, winner: ev.winners }));
        }

        setPastEvents(enhancedPast);
        setWeekSchedule(buildSchedule(all || []));
      } catch (err) {
        setError(err?.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
    pollId = setInterval(loadEvents, POLL_MS);
    return () => {
      if (pollId) clearInterval(pollId);
    };
  }, []);

  const filterEvents = (events) => {
    if (!searchQuery) return events;
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const sortEvents = (events) => {
    const sortedEvents = [...events];
    switch (sortBy) {
      case 'name':
        return sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
      case 'location':
        return sortedEvents.sort((a, b) => (a.location || '').localeCompare(b.location || ''));
      case 'date':
      default:
        return sortedEvents.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    }
  };

  const renderSearchAndSort = () => (
    <View style={styles.searchSortContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.GRAY_MEDIUM} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          placeholderTextColor={COLORS.GRAY_MEDIUM}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close" size={20} color={COLORS.GRAY_MEDIUM} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'date' && styles.sortButtonActive]}
          onPress={() => setSortBy('date')}
        >
          <Text style={[styles.sortButtonText, sortBy === 'date' && styles.sortButtonTextActive]}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
          onPress={() => setSortBy('name')}
        >
          <Text style={[styles.sortButtonText, sortBy === 'name' && styles.sortButtonTextActive]}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'location' && styles.sortButtonActive]}
          onPress={() => setSortBy('location')}
        >
          <Text style={[styles.sortButtonText, sortBy === 'location' && styles.sortButtonTextActive]}>Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'schedule' && styles.activeTab]}
        onPress={() => setSelectedTab('schedule')}
      >
        <Text style={[styles.tabText, selectedTab === 'schedule' && styles.activeTabText]}>
          Schedule
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'ongoing' && styles.activeTab]}
        onPress={() => setSelectedTab('ongoing')}
      >
        <Text style={[styles.tabText, selectedTab === 'ongoing' && styles.activeTabText]}>
          Ongoing
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
        onPress={() => setSelectedTab('upcoming')}
      >
        <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
          Upcoming
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
        onPress={() => setSelectedTab('past')}
      >
        <Text style={[styles.tabText, selectedTab === 'past' && styles.activeTabText]}>
          Past
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderScheduleDay = (dayData) => (
    <View key={dayData.date} style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayText}>{dayData.day}</Text>
        <Text style={styles.dateText}>{new Date(dayData.date).getDate()}</Text>
      </View>
      <View style={styles.eventsContainer}>
        {dayData.events.map((event, index) => (
          <View key={index} style={styles.scheduleEvent}>
            <View style={[styles.eventTypeIndicator, { backgroundColor: getEventTypeColor(event.type) }]} />
            <View style={styles.eventTimeContainer}>
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventLocation}>📍 {event.location}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderOngoingEvent = (event) => (
    <View key={event.id} style={styles.ongoingEventCard}>
      <LinearGradient colors={GRADIENTS.ACCENT} style={styles.liveIndicator}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>LIVE</Text>
      </LinearGradient>
      
      <Text style={styles.ongoingEventTitle}>{event.title}</Text>
      <Text style={styles.ongoingEventTime}>
        {event.time || 'In progress'} • {event.location}
      </Text>
      
    </View>
  );

  const renderUpcomingEvent = (event) => (
    <View key={event.id} style={styles.upcomingEventCard}>
      <View style={styles.upcomingEventHeader}>
        <Text style={styles.upcomingEventTitle}>{event.title}</Text>
        <View style={[styles.registrationBadge, { backgroundColor: event.registrationOpen ? COLORS.SUCCESS : COLORS.GRAY_MEDIUM }]}>
          <Text style={styles.registrationText}>
            {event.registrationOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.upcomingEventDateTime}>
        📅 {new Date(event.date).toLocaleDateString()} • ⏰ {event.time}
      </Text>
      <Text style={styles.upcomingEventLocation}>📍 {event.location}</Text>
      
      
    </View>
  );

  const renderPastEvent = (event) => (
    <View key={event.id} style={styles.pastEventCard}>
      <View style={styles.pastEventHeader}>
        <Text style={styles.pastEventTitle}>{event.title}</Text>
        <Text style={styles.pastEventDate}>
          {new Date(event.date).toLocaleDateString()}
        </Text>
      </View>
      
      {event.winner && (
        <View style={styles.winnerContainer}>
          <Ionicons name="trophy" size={16} color={COLORS.PRIMARY_WHITE} />
          <Text style={styles.winnerText}>Winner: {event.winner}</Text>
        </View>
      )}
      
      {event.scores && (
        <View style={styles.scoresContainer}>
          <Text style={styles.scoresTitle}>Results:</Text>
          {event.scores.map((score, index) => (
            <View key={score.batch} style={styles.scoreRow}>
              <Text style={styles.scorePosition}>#{index + 1}</Text>
              <Text style={styles.scoreBatch}>{score.batch}</Text>
              <Text style={styles.scoreValue}>{score.score}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderTabs()}

        {/* Show search and sort for upcoming, ongoing, and past events */}
        {(selectedTab === 'upcoming' || selectedTab === 'ongoing' || selectedTab === 'past') && renderSearchAndSort()}

        {loading && (
          <View style={{ padding: 16 }}>
            <Text style={{ color: COLORS.PRIMARY_DARK }}>Loading events...</Text>
          </View>
        )}

        {!!error && (
          <View style={{ padding: 16 }}>
            <Text style={{ color: COLORS.DANGER }}>Error: {error}</Text>
          </View>
        )}

        {selectedTab === 'schedule' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="calendar" size={24} color={COLORS.PRIMARY_RED} />
              <Text style={styles.sectionTitle}>7-Day Event Schedule</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scheduleScroll}>
              {weekSchedule.map(day => renderScheduleDay(day))}
            </ScrollView>
          </View>
        )}

        {selectedTab === 'ongoing' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="play-circle" size={24} color={COLORS.PRIMARY_RED} />
              <Text style={styles.sectionTitle}>Ongoing Events</Text>
            </View>
            {sortEvents(filterEvents(ongoingEvents)).map(event => renderOngoingEvent(event))}
          </View>
        )}

        {selectedTab === 'upcoming' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={24} color={COLORS.PRIMARY_RED} />
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
            </View>
            {sortEvents(filterEvents(upcomingEvents)).map(event => renderUpcomingEvent(event))}
          </View>
        )}

        {selectedTab === 'past' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.PRIMARY_RED} />
              <Text style={styles.sectionTitle}>Past Events</Text>
            </View>
            {sortEvents(filterEvents(pastEvents)).map(event => renderPastEvent(event))}
          </View>
        )}
      </ScrollView>

      <EventRegistrationModal
        event={selectedEvent}
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  searchSortContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...SHADOWS.LIGHT,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.PRIMARY_DARK,
  },
  clearButton: {
    padding: 4,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginRight: 12,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.GRAY_LIGHT,
    marginRight: 8,
    marginBottom: 4,
  },
  sortButtonActive: {
    backgroundColor: COLORS.PRIMARY_RED,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GRAY_DARK,
  },
  sortButtonTextActive: {
    color: COLORS.PRIMARY_WHITE,
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
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.PRIMARY_RED,
  },
  tabText: {
    fontSize: 12,
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
  scheduleScroll: {
    marginBottom: 20,
      paddingHorizontal: 0,
      paddingVertical: 20,
  },
  dayContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 380,
    ...SHADOWS.LIGHT,
  },
  dayHeader: {
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_RED,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
  },
  eventsContainer: {
    gap: 12,
  },
  scheduleEvent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTypeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  eventTimeContainer: {
    width: 50,
    marginRight: 12,
  },
  eventTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
  },
  ongoingEventCard: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_RED,
    ...SHADOWS.MEDIUM,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.PRIMARY_WHITE,
    marginRight: 6,
  },
  liveText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  ongoingEventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  ongoingEventTime: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    marginBottom: 12,
  },
  participantsContainer: {
    marginTop: 8,
  },
  participantsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantBadge: {
    backgroundColor: COLORS.GRAY_LIGHT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  participantText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
  },
  upcomingEventCard: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...SHADOWS.LIGHT,
  },
  upcomingEventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  upcomingEventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    flex: 1,
    marginRight: 12,
  },
  registrationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  registrationText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  upcomingEventDateTime: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    marginBottom: 4,
  },
  upcomingEventLocation: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    marginBottom: 16,
  },
  slotsContainer: {
    marginBottom: 16,
  },
  slotsText: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY_RED,
  },
  registerButton: {
    backgroundColor: COLORS.PRIMARY_RED,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  pastEventCard: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...SHADOWS.LIGHT,
  },
  pastEventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pastEventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    flex: 1,
  },
  pastEventDate: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
  },
  winnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_RED,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  winnerText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  scoresContainer: {
    marginTop: 8,
  },
  scoresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  scorePosition: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.GRAY_DARK,
    width: 30,
  },
  scoreBatch: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    flex: 1,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_RED,
  },
});

export default EventsScreen;
