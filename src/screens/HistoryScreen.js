import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';

const HistoryScreen = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const eWeekHistory = {
    '2024': {
      theme: 'Digital Renaissance',
      champion: 'E20',
      runner_up: 'E21',
      events: 15,
      participants: 1200,
      highlights: [
        'First virtual reality gaming tournament',
        'AI-powered coding challenge',
        'Sustainable design competition',
        'Record participation from all batches'
      ],
      gallery: [
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Opening+2024',
        'https://via.placeholder.com/300x200/A71C20/FFFFFF?text=Gaming+2024',
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Coding+2024',
      ]
    },
    '2023': {
      theme: 'Cyber Nexus',
      champion: 'E19',
      runner_up: 'E20',
      events: 12,
      participants: 980,
      highlights: [
        'Introduction of mobile gaming category',
        'First international guest speakers',
        'Blockchain development workshop',
        'Record-breaking prize pool'
      ],
      gallery: [
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Opening+2023',
        'https://via.placeholder.com/300x200/A71C20/FFFFFF?text=Workshop+2023',
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Awards+2023',
      ]
    },
    '2022': {
      theme: 'Tech Revolution',
      champion: 'E18',
      runner_up: 'E19',
      events: 10,
      participants: 850,
      highlights: [
        'First hybrid online-offline event',
        'Introduction of design thinking workshops',
        'Robot building competition',
        'Industry partnership program launch'
      ],
      gallery: [
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Hybrid+2022',
        'https://via.placeholder.com/300x200/A71C20/FFFFFF?text=Robots+2022',
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Design+2022',
      ]
    },
    '2021': {
      theme: 'Innovation Hub',
      champion: 'E17',
      runner_up: 'E18',
      events: 8,
      participants: 720,
      highlights: [
        'First fully online E-Week due to pandemic',
        'Virtual networking sessions',
        'Online hackathon marathon',
        'Digital art showcase'
      ],
      gallery: [
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Virtual+2021',
        'https://via.placeholder.com/300x200/A71C20/FFFFFF?text=Hackathon+2021',
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Digital+Art+2021',
      ]
    },
    '2020': {
      theme: 'Future Forward',
      champion: 'E16',
      runner_up: 'E17',
      events: 12,
      participants: 900,
      highlights: [
        'IoT development competition',
        'Sustainable technology focus',
        'Alumni mentorship program',
        'Industry collaboration projects'
      ],
      gallery: [
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=IoT+2020',
        'https://via.placeholder.com/300x200/A71C20/FFFFFF?text=Sustainable+2020',
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Mentorship+2020',
      ]
    },
    '2019': {
      theme: 'Tech Titans',
      champion: 'E15',
      runner_up: 'E16',
      events: 10,
      participants: 780,
      highlights: [
        'First drone racing competition',
        'Machine learning workshop series',
        'Startup pitch competition',
        'International university exchanges'
      ],
      gallery: [
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Drones+2019',
        'https://via.placeholder.com/300x200/A71C20/FFFFFF?text=ML+2019',
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Startup+2019',
      ]
    },
    '2018': {
      theme: 'Engineering Excellence',
      champion: 'E14',
      runner_up: 'E15',
      events: 9,
      participants: 650,
      highlights: [
        'Introduction of eSports category',
        'First female champion in coding',
        '3D printing workshop',
        'Green technology showcase'
      ],
      gallery: [
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Esports+2018',
        'https://via.placeholder.com/300x200/A71C20/FFFFFF?text=3D+Printing+2018',
        'https://via.placeholder.com/300x200/110921/FFFFFF?text=Green+Tech+2018',
      ]
    }
  };

  const allTimeStats = {
    totalEvents: 76,
    totalParticipants: 6080,
    yearsActive: 7,
    averageParticipation: 869
  };

  const legendaryChampions = [
    { year: '2024', batch: 'E20', points: 1250 },
    { year: '2023', batch: 'E19', points: 1180 },
    { year: '2022', batch: 'E18', points: 1050 },
    { year: '2021', batch: 'E17', points: 980 },
    { year: '2020', batch: 'E16', points: 920 },
    { year: '2019', batch: 'E15', points: 850 },
    { year: '2018', batch: 'E14', points: 780 },
  ];

  const renderYearSelector = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.yearSelector}>
      {Object.keys(eWeekHistory).map(year => (
        <TouchableOpacity
          key={year}
          style={[styles.yearButton, selectedYear === year && styles.selectedYearButton]}
          onPress={() => setSelectedYear(year)}
        >
          <Text style={[styles.yearButtonText, selectedYear === year && styles.selectedYearButtonText]}>
            {year}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderYearDetails = () => {
    const yearData = eWeekHistory[selectedYear];
    
    return (
      <View style={styles.yearDetailsContainer}>
        <LinearGradient colors={GRADIENTS.PRIMARY} style={styles.yearHeader}>
          <Text style={styles.yearTitle}>E-Week {selectedYear}</Text>
          <Text style={styles.yearTheme}>"{yearData.theme}"</Text>
        </LinearGradient>
        
        <View style={styles.yearContent}>
          <View style={styles.championSection}>
            <Text style={styles.sectionTitle}>🏆 Champions</Text>
            <View style={styles.championCard}>
              <LinearGradient colors={['#FFD700', '#FFA500']} style={styles.championBadge}>
                <Ionicons name="trophy" size={24} color={COLORS.PRIMARY_WHITE} />
              </LinearGradient>
              <View style={styles.championInfo}>
                <Text style={styles.championText}>Champion: {yearData.champion}</Text>
                <Text style={styles.runnerUpText}>Runner-up: {yearData.runner_up}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>📊 Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{yearData.events}</Text>
                <Text style={styles.statLabel}>Events</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{yearData.participants}</Text>
                <Text style={styles.statLabel}>Participants</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>✨ Highlights</Text>
            {yearData.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <View style={styles.highlightDot} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.gallerySection}>
            <Text style={styles.sectionTitle}>📸 Gallery</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
              {yearData.gallery.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.galleryImage} />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  const renderAllTimeStats = () => (
    <View style={styles.allTimeStatsContainer}>
      <Text style={styles.allTimeTitle}>All-Time Statistics</Text>
      <View style={styles.allTimeGrid}>
        <View style={styles.allTimeStatCard}>
          <Text style={styles.allTimeStatNumber}>{allTimeStats.totalEvents}</Text>
          <Text style={styles.allTimeStatLabel}>Total Events</Text>
        </View>
        <View style={styles.allTimeStatCard}>
          <Text style={styles.allTimeStatNumber}>{allTimeStats.totalParticipants.toLocaleString()}</Text>
          <Text style={styles.allTimeStatLabel}>Total Participants</Text>
        </View>
        <View style={styles.allTimeStatCard}>
          <Text style={styles.allTimeStatNumber}>{allTimeStats.yearsActive}</Text>
          <Text style={styles.allTimeStatLabel}>Years Active</Text>
        </View>
        <View style={styles.allTimeStatCard}>
          <Text style={styles.allTimeStatNumber}>{allTimeStats.averageParticipation}</Text>
          <Text style={styles.allTimeStatLabel}>Avg Participation</Text>
        </View>
      </View>
    </View>
  );

  const renderLegendaryChampions = () => (
    <View style={styles.legendarySection}>
      <Text style={styles.legendaryTitle}>🏆 Hall of Champions</Text>
      <View style={styles.championsContainer}>
        {legendaryChampions.map((champion, index) => (
          <View key={champion.year} style={[styles.legendaryCard, index < 3 && styles.topThreeLegendary]}>
            <View style={[styles.legendaryRank, index === 0 && styles.goldRank, index === 1 && styles.silverRank, index === 2 && styles.bronzeRank]}>
              <Text style={[styles.legendaryRankText, index < 3 && styles.topThreeRankText]}>
                {index + 1}
              </Text>
            </View>
            <View style={styles.legendaryInfo}>
              <Text style={styles.legendaryBatch}>{champion.batch}</Text>
              <Text style={styles.legendaryYear}>{champion.year}</Text>
              <Text style={styles.legendaryPoints}>{champion.points} pts</Text>
            </View>
            {index < 3 && (
              <Ionicons 
                name={index === 0 ? 'trophy' : index === 1 ? 'medal' : 'ribbon'} 
                size={20} 
                color={index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'} 
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>E-Week History</Text>
          <Text style={styles.headerSubtitle}>Celebrating Engineering Excellence Since 2018</Text>
        </View>

        {renderAllTimeStats()}
        
        <View style={styles.yearlyHistoryContainer}>
          <Text style={styles.yearlyHistoryTitle}>Yearly Chronicles</Text>
          {renderYearSelector()}
          {renderYearDetails()}
        </View>
      </ScrollView>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
  },
  allTimeStatsContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...SHADOWS.MEDIUM,
  },
  allTimeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    textAlign: 'center',
    marginBottom: 20,
  },
  allTimeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  allTimeStatCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  allTimeStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_RED,
    marginBottom: 4,
  },
  allTimeStatLabel: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
  },
  legendarySection: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...SHADOWS.MEDIUM,
  },
  legendaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    textAlign: 'center',
    marginBottom: 20,
  },
  championsContainer: {
    gap: 12,
  },
  legendaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 12,
    padding: 16,
  },
  topThreeLegendary: {
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_RED,
  },
  legendaryRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goldRank: {
    backgroundColor: '#FFD700',
  },
  silverRank: {
    backgroundColor: '#C0C0C0',
  },
  bronzeRank: {
    backgroundColor: '#CD7F32',
  },
  legendaryRankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
  },
  topThreeRankText: {
    color: COLORS.PRIMARY_WHITE,
  },
  legendaryInfo: {
    flex: 1,
  },
  legendaryBatch: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
  },
  legendaryYear: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
  },
  legendaryPoints: {
    fontSize: 14,
    color: COLORS.PRIMARY_RED,
    fontWeight: '600',
  },
  yearlyHistoryContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.MEDIUM,
  },
  yearlyHistoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    textAlign: 'center',
    marginBottom: 20,
  },
  yearSelector: {
    marginBottom: 20,
  },
  yearButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 20,
  },
  selectedYearButton: {
    backgroundColor: COLORS.PRIMARY_RED,
  },
  yearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_DARK,
  },
  selectedYearButtonText: {
    color: COLORS.PRIMARY_WHITE,
  },
  yearDetailsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  yearHeader: {
    padding: 20,
    alignItems: 'center',
  },
  yearTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginBottom: 8,
  },
  yearTheme: {
    fontSize: 16,
    color: COLORS.PRIMARY_WHITE,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  yearContent: {
    padding: 20,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  championSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 12,
  },
  championCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 16,
  },
  championBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  championInfo: {
    flex: 1,
  },
  championText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 4,
  },
  runnerUpText: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
  },
  statsSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_RED,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
  },
  highlightsSection: {
    marginBottom: 20,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.PRIMARY_RED,
    marginRight: 12,
  },
  highlightText: {
    fontSize: 14,
    color: COLORS.PRIMARY_DARK,
    flex: 1,
    lineHeight: 20,
  },
  gallerySection: {
    marginBottom: 10,
  },
  galleryScroll: {
    marginTop: 8,
  },
  galleryImage: {
    width: 200,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },
});

export default HistoryScreen;
