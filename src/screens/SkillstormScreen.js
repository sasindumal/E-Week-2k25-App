import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';
import EventRegistrationModal from '../components/EventRegistrationModal';

const { width, height } = Dimensions.get('window');

const SkillstormScreen = ({ user }) => {
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const competitions = {
    codeyssey: {
      title: 'Codeyssey',
      subtitle: 'The Ultimate Programming Odyssey',
      logo: 'https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2F6eaae82a09084f45af3f34befc1e8b7b?format=webp&width=800',
      gradient: ['#FF6B35', '#F7931E', '#FFD700'],
      description: 'Embark on the ultimate coding journey where algorithms meet innovation',
      maxGroups: 2,
      membersPerGroup: '3-5',
      category: 'Programming',
      duration: '4 Hours',
      difficulty: 'Expert',
      rules: [
        'Only 2 groups per batch can apply',
        'Each group must have 3-5 members',
        'Programming languages: Python, Java, C++, JavaScript',
        'Problem-solving and algorithm design',
        'Real-time collaborative coding challenges',
      ]
    },
    pixelAres: {
      title: 'Pixel Ares',
      subtitle: 'Where Creativity Meets Technology',
      logo: 'https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2F52d3c65d70ed418e986d9413d10483f1?format=webp&width=800',
      gradient: ['#3A8DFF', '#FF6B35', '#E74C3C'],
      description: 'Transform imagination into digital reality through cutting-edge design',
      maxMembers: 10,
      category: 'Design',
      duration: '6 Hours',
      difficulty: 'Advanced',
      rules: [
        'Maximum 10 members per batch can apply',
        'Individual participation',
        'Design tools: Photoshop, Illustrator, Figma allowed',
        'Theme will be announced on competition day',
        'Focus on user experience and visual innovation',
      ]
    },
    titanCAD: {
      title: 'Titan CAD',
      subtitle: 'Engineering Excellence Redefined',
      logo: 'https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2Fe636393f82414aca9bac34463af434e1?format=webp&width=800',
      gradient: ['#00C9FF', '#92FE9D', '#FFD700'],
      description: 'Master the art of precision engineering and 3D innovation',
      maxGroups: 5,
      membersPerGroup: '2',
      category: 'Engineering',
      duration: '5 Hours',
      difficulty: 'Professional',
      rules: [
        'Only 5 groups per batch can apply',
        'Each group must have exactly 2 members',
        'SolidWorks 2023 or later versions allowed',
        'CAD modeling and technical drawing skills required',
        'Focus on mechanical design and innovation',
      ]
    },
    clutchZone: {
      title: 'Clutch Zone',
      subtitle: 'The Ultimate Gaming Arena',
      logo: 'https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2Fe5291f5b37684dd28ba4087ad1a6e4d2?format=webp&width=800',
      gradient: ['#667eea', '#764ba2', '#f093fb'],
      description: 'Enter the digital battlefield where legends are born',
      category: 'Esports',
      duration: 'Multiple Days',
      difficulty: 'Competitive',
      categories: {
        pcGames: {
          title: 'PC Games',
          games: {
            valorant: {
              name: 'Valorant',
              mode: 'Unrated – Tournament Mode',
              teamSize: 5,
              substituteAllowed: true,
              teamsPerBatch: 1,
              rules: [
                'Maximum FIVE players per team',
                'One substitute player can be registered',
                'Single/Double elimination bracket',
                'Players can only play for one team',
                'Substitute must be registered before tournament',
              ]
            },
            sixSiege: {
              name: 'Rainbow Six Siege',
              teamSize: 5,
              teamsPerBatch: 1,
              mapPool: ['House', 'Chalet', 'Club House', 'Kanal', 'Oregon'],
              rules: [
                'Team must consist of FIVE players',
                'Tournament format matches',
                '2 rounds per match',
                'Preparation time: 60s',
                'Action phase: 300s',
                'Friendly fire disabled',
              ]
            },
            blur: {
              name: 'Blur',
              maxPlayers: 4,
              classes: ['Class A', 'Class B'],
              mapPool: [
                'SanFran Sausalito – Bay Area Tour (3 Laps)',
                'La River – Concrete Basin (3 Laps)',
                'La Docks – Cago Run (3 Laps)',
                'Hollywood Hills – Hollywood Rift (2 Laps)',
                'Brighton – Coastal Cruise (3 Laps)',
                'Barcelona Gracia – Passeig De Gracia (3 Laps)',
                'Amboy – Route 66 (2 Laps)',
              ],
              rules: [
                'Maximum 4 players per batch',
                'Only Class A and Class B available',
                'Single/Double elimination bracket',
              ]
            },
            cod4: {
              name: 'COD 4 (Search and Destroy)',
              teamSize: 5,
              teamsPerBatch: 1,
              specialRule: 'Each team must have at least one girl',
              mapPool: ['Crash', 'Carnival', 'Terminal', 'Estate', 'Karachi', 'Scrapyard'],
              rules: [
                'Maximum one team per batch',
                'Team must have at least one girl',
                'Search and Destroy mode (10 min)',
                'Winner chooses map, other team chooses attack/defense',
                'Friendly fire disabled',
                'Kill streak rewards disabled',
              ]
            },
            nfsGirls: {
              name: 'Need for Speed Most Wanted (Girls Only)',
              maxPlayers: 4,
              genderRestriction: 'Girls Only',
              rules: [
                'Maximum 4 girls per batch',
                'Maps announced prior to game',
                'Single/Double elimination bracket',
              ]
            }
          }
        },
        mobileGames: {
          title: 'Mobile Games',
          games: {
            pubgMobile: {
              name: 'PUBG Mobile',
              maxTeams: 4,
              platform: 'Mobile Only',
              mapPool: ['Erangel', 'Sanhok'],
              rules: [
                'Maximum 4 teams per batch',
                'Mobile platform only - no emulators',
                'If less than 8 teams registered, TDM mode',
                'Bring your own device',
                'No dress code required',
              ]
            },
            codMobile: {
              name: 'COD Mobile',
              rules: ['Details to be announced']
            }
          }
        },
        funGames: {
          title: 'Fun Games (No Registration Required)',
          games: {
            monopoly: {
              name: 'Monopoly (PC)',
              registration: false
            },
            omi: {
              name: 'Omi (Mobile)',
              registration: false
            }
          }
        }
      }
    }
  };

  const handleRegister = (competitionType, eventName = null) => {
    const competition = competitions[competitionType];
    const finalEventName = eventName || competition?.title;

    // Convert competition data to event format
    const eventData = {
      id: `${competitionType}_${Date.now()}`,
      name: finalEventName,
      title: finalEventName,
      date: '2025-02-16',
      time: '10:00 AM',
      location: 'Computer Lab / Gaming Zone',
      type: competition?.maxGroups ? 'team' : 'individual',
      playersPerTeam: competition?.membersPerGroup ? parseInt(competition.membersPerGroup.split('-')[0]) || 4 : 1,
      maxTeamsPerBatch: competition?.maxGroups || 0,
      maxPlayersPerBatch: competition?.maxMembers || 20,
    };

    setSelectedEvent(eventData);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = (registrationData) => {
    Alert.alert(
      'Registration Successful',
      `Registration submitted for ${registrationData.eventName}`,
      [{ text: 'OK' }]
    );
    setShowRegistrationModal(false);
  };

  const renderCompetitionCard = (key, competition) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View
        key={key}
        style={[
          styles.competitionCard,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => setSelectedCompetition(selectedCompetition === key ? null : key)}
          activeOpacity={0.9}
        >
          {/* Background Gradient */}
          <LinearGradient
            colors={competition.gradient}
            style={styles.cardBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          {/* Overlay Pattern */}
          <View style={styles.cardOverlay} />

          {/* Competition Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: competition.logo }}
              style={styles.competitionLogo}
              resizeMode="contain"
            />
          </View>

          {/* Competition Info */}
          <View style={styles.competitionInfo}>
            <Text style={styles.competitionTitle}>{competition.title}</Text>
            <Text style={styles.competitionSubtitle}>{competition.subtitle}</Text>

            {/* Meta Information */}
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Ionicons name="time" size={14} color={COLORS.PRIMARY_WHITE} />
                <Text style={styles.metaText}>{competition.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="trophy" size={14} color={COLORS.PRIMARY_WHITE} />
                <Text style={styles.metaText}>{competition.difficulty}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="bookmark" size={14} color={COLORS.PRIMARY_WHITE} />
                <Text style={styles.metaText}>{competition.category}</Text>
              </View>
            </View>

            {/* Expand/Collapse Indicator */}
            <View style={styles.expandIndicator}>
              <Ionicons
                name={selectedCompetition === key ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={COLORS.PRIMARY_WHITE}
              />
            </View>
          </View>

          {/* Floating Elements */}
          <View style={styles.floatingElements}>
            <View style={[styles.floatingDot, styles.dot1]} />
            <View style={[styles.floatingDot, styles.dot2]} />
            <View style={[styles.floatingDot, styles.dot3]} />
          </View>
        </TouchableOpacity>

        {/* Expanded Content */}
        {selectedCompetition === key && (
          <Animated.View style={styles.expandedContent}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.expandedBackground}
            />

            <Text style={styles.competitionDescription}>{competition.description}</Text>

            {key !== 'clutchZone' && (
              <>
                <View style={styles.statsContainer}>
                  {competition.maxGroups && (
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{competition.maxGroups}</Text>
                      <Text style={styles.statLabel}>Max Groups</Text>
                    </View>
                  )}
                  {competition.maxMembers && (
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{competition.maxMembers}</Text>
                      <Text style={styles.statLabel}>Max Members</Text>
                    </View>
                  )}
                  {competition.membersPerGroup && (
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{competition.membersPerGroup}</Text>
                      <Text style={styles.statLabel}>Team Size</Text>
                    </View>
                  )}
                </View>

                <View style={styles.rulesContainer}>
                  <Text style={styles.rulesTitle}>Competition Rules</Text>
                  {competition.rules.map((rule, index) => (
                    <View key={index} style={styles.ruleItem}>
                      <View style={styles.ruleBullet} />
                      <Text style={styles.ruleText}>{rule}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.modernRegisterButton}
                  onPress={() => handleRegister(key)}
                >
                  <LinearGradient
                    colors={['#FF6B35', '#F7931E']}
                    style={styles.registerButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                  <Ionicons name="rocket" size={20} color={COLORS.PRIMARY_WHITE} />
                  <Text style={styles.registerButtonText}>Launch Registration</Text>
                </TouchableOpacity>
              </>
            )}

            {key === 'clutchZone' && renderClutchZoneCategories()}
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderClutchZoneCategories = () => (
    <View style={styles.clutchZoneContainer}>
      {Object.entries(competitions.clutchZone.categories).map(([categoryKey, category]) => (
        <View key={categoryKey} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          
          {Object.entries(category.games).map(([gameKey, game]) => (
            <View key={gameKey} style={styles.gameCard}>
              <View style={styles.gameHeader}>
                <Text style={styles.gameName}>{game.name}</Text>
                {game.genderRestriction && (
                  <View style={styles.restrictionBadge}>
                    <Text style={styles.restrictionText}>{game.genderRestriction}</Text>
                  </View>
                )}
              </View>
              
              {game.mode && (
                <Text style={styles.gameMode}>{game.mode}</Text>
              )}
              
              <View style={styles.gameInfoGrid}>
                {game.teamSize && (
                  <Text style={styles.gameInfo}>Team Size: {game.teamSize}</Text>
                )}
                {game.maxPlayers && (
                  <Text style={styles.gameInfo}>Max Players: {game.maxPlayers}</Text>
                )}
                {game.maxTeams && (
                  <Text style={styles.gameInfo}>Max Teams: {game.maxTeams}</Text>
                )}
                {game.teamsPerBatch && (
                  <Text style={styles.gameInfo}>Teams per Batch: {game.teamsPerBatch}</Text>
                )}
                {game.platform && (
                  <Text style={styles.gameInfo}>Platform: {game.platform}</Text>
                )}
              </View>
              
              {game.mapPool && (
                <View style={styles.mapPoolContainer}>
                  <Text style={styles.mapPoolTitle}>Map Pool:</Text>
                  {game.mapPool.map((map, index) => (
                    <Text key={index} style={styles.mapText}>• {map}</Text>
                  ))}
                </View>
              )}
              
              {game.rules && (
                <View style={styles.gameRulesContainer}>
                  <Text style={styles.gameRulesTitle}>Rules:</Text>
                  {game.rules.map((rule, index) => (
                    <Text key={index} style={styles.gameRuleText}>• {rule}</Text>
                  ))}
                </View>
              )}
              
              {game.registration !== false && (
                <TouchableOpacity 
                  style={styles.gameRegisterButton}
                  onPress={() => handleRegister('clutchZone', game.name)}
                >
                  <Text style={styles.gameRegisterButtonText}>Register for {game.name}</Text>
                </TouchableOpacity>
              )}
              
              {game.registration === false && (
                <View style={styles.noRegistrationBadge}>
                  <Text style={styles.noRegistrationText}>No Registration Required</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background Gradient */}


      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Futuristic Header */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            style={styles.headerBackground}
          />

          {/* Main Skillstorm Logo */}
          <View style={styles.logoSection}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2Fbd51835992524731a6b6d9400b71f26a?format=webp&width=800' }}
              style={styles.skillstormLogo}
              resizeMode="contain"
            />
            <View style={styles.glowEffect} />
          </View>

          <Text style={styles.headerTitle}>SKILLSTORM 2025</Text>
          <Text style={styles.headerSubtitle}>Where Innovation Meets Competition</Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Competitions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100+</Text>
              <Text style={styles.statLabel}>Participants</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
          </View>
        </View>

        {/* Competition Cards */}
        <View style={styles.competitionsContainer}>
          <Text style={styles.sectionTitle}>Choose Your Arena</Text>
          {Object.entries(competitions).map(([key, competition]) =>
            renderCompetitionCard(key, competition)
          )}
        </View>

        {/* Footer Space */}
        <View style={styles.footerSpace} />
      </ScrollView>

      <EventRegistrationModal
        event={selectedEvent}
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  element1: {
    width: 200,
    height: 200,
    top: 100,
    left: -50,
  },
  element2: {
    width: 150,
    height: 150,
    top: 300,
    right: -30,
    backgroundColor: 'rgba(58, 141, 255, 0.1)',
  },
  element3: {
    width: 100,
    height: 100,
    bottom: 200,
    left: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 20,
    borderWidth: 1,
      backgroundColor: COLORS.PRIMARY_DARK,
    borderColor: 'rgba(255,255,255,0.1)',
      marginHorizontal:15
  },
  logoSection: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  skillstormLogo: {
    width: 250,
    height: 100,
    zIndex: 2,
  },
  glowEffect: {
    position: 'absolute',
    width: 300,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 53, 0.3)',
    blur: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    textAlign: 'center',
      marginTop:20,
    marginBottom: 20,
    letterSpacing: 1,
  },
  competitionsContainer: {
    gap: 24,
    paddingBottom: 20,
  },
  competitionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  cardContainer: {
    position: 'relative',
    height: 200,
    overflow: 'hidden',
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  competitionLogo: {
    width: 60,
    height: 60,
  },
  competitionInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 60,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  },
  competitionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginBottom: 4,
  },
  competitionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  expandIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dot1: {
    top: 40,
    left: 40,
  },
  dot2: {
    top: 80,
    right: 60,
  },
  dot3: {
    bottom: 60,
    left: 60,
  },
  expandedContent: {
    position: 'relative',
    backgroundColor: 'rgba(15, 12, 41, 0.95)',
    padding: 24,
  },
  expandedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  competitionDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 24,
    lineHeight: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  rulesContainer: {
    marginBottom: 24,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginBottom: 16,
    textAlign: 'center',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ruleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B35',
    marginTop: 6,
    marginRight: 12,
  },
  ruleText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    flex: 1,
  },
  modernRegisterButton: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  registerButtonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  registerButtonText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footerSpace: {
    height: 40,
  },
  clutchZoneContainer: {
    gap: 20,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginBottom: 12,
    paddingLeft: 8,
  },
  gameCard: {
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    flex: 1,
  },
  restrictionBadge: {
    backgroundColor: COLORS.PRIMARY_RED,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  restrictionText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 10,
    fontWeight: 'bold',
  },
  gameMode: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  gameInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  gameInfo: {
    fontSize: 12,
    color: COLORS.PRIMARY_DARK,
    backgroundColor: COLORS.PRIMARY_WHITE,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '600',
  },
  mapPoolContainer: {
    marginBottom: 12,
  },
  mapPoolTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    marginBottom: 2,
    paddingLeft: 8,
  },
  gameRulesContainer: {
    marginBottom: 16,
  },
  gameRulesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  gameRuleText: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    marginBottom: 4,
    paddingLeft: 8,
    lineHeight: 16,
  },
  gameRegisterButton: {
    backgroundColor: COLORS.PRIMARY_RED,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  gameRegisterButtonText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 10,
    fontWeight: 'bold',
      alignSelf: 'center',
      paddingLeft: 8,
  },
  noRegistrationBadge: {
    backgroundColor: COLORS.GRAY_MEDIUM,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  noRegistrationText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SkillstormScreen;
