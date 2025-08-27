import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import ModernCard from '../components/ui/ModernCard';
import ModernText from '../components/ui/ModernText';
import ModernButton from '../components/ui/ModernButton';
import { MODERN_COLORS, MODERN_GRADIENTS, MODERN_SHADOWS, MODERN_SPACING } from '../constants/modernTheme';

const { width } = Dimensions.get('window');

const AboutScreen = () => {
  const openWebsite = (url) => {
    Linking.openURL(url);
  };

  const appDevelopers = [
    {
      name: 'Sasindu Malhara',
      role: 'Full-Stack App Developer & AI/ML Engineer',
      description: 'Computer Engineering Student specializing in Mobile Applications, Electronics Integration, and Machine Learning Solutions',
      image: require('../../assets/sasindu.jpeg'),
      linkedin: 'https://www.linkedin.com/in/sasindu-malhara-a87ab4236/',
      skills: ['React Native', 'AI/ML', 'Electronics', 'Mobile Dev']
    },
    {
      name: 'Aakil Ahamed',
      role: 'Software Engineer & Cloud Computing Specialist',
      description: 'Passionate about AI, Machine Learning, Deep Learning, and Embedded Systems Development',
      image: require('../../assets/Aakil.jpeg'),
      linkedin: 'https://www.linkedin.com/in/aakil-ahamed-29a519311/',
      skills: ['Cloud Computing', 'AI/ML', 'Deep Learning', 'Embedded Systems']
    },
  ];

  const sponsors = [
    {
      name: 'MELWA',
      category: 'Platinum Sponsor',
      logo: require('../../assets/Melwa.jpeg'),
      website: 'https://melwa.com',
      description: 'Leading technology partner supporting innovation in engineering education'
    },
  ];

  const features = [
    {
      icon: 'school',
      title: 'Q-FIESTA',
      description: 'Inter-school quiz competition fostering academic excellence'
    },
    {
      icon: 'construct',
      title: 'Technical Workshops',
      description: 'Hands-on learning sessions with industry experts'
    },
    {
      icon: 'heart',
      title: 'Social Responsibility',
      description: 'Community outreach and sustainable development initiatives'
    },
    {
      icon: 'game-controller',
      title: 'Esports Arena',
      description: 'Competitive gaming tournaments and digital sports'
    },
    {
      icon: 'star',
      title: 'Cultural Events',
      description: 'Celebrating diversity through arts and performances'
    },
    {
      icon: 'trophy',
      title: 'Grand Finale',
      description: 'Spectacular closing ceremony with talent showcase'
    },
  ];

  const stats = [
    { value: '5000+', label: 'Expected Attendees', icon: 'people' },
    { value: '7', label: 'Days of Innovation', icon: 'calendar' },
    { value: '50+', label: 'Events & Activities', icon: 'rocket' },
    { value: '4', label: 'Engineering Batches', icon: 'school' },
  ];

  const socialMedia = [
    { name: 'Facebook', icon: 'logo-facebook', color: '#1877F2', url: 'https://m.facebook.com/100071054394311/' },
  ];

  const renderHeader = () => (
    <ModernCard variant="elevated" gradient={MODERN_GRADIENTS.primary} style={styles.headerCard}>
      <View style={styles.headerPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>
      
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logo.png')}
            style={styles.eweekLogo}
            resizeMode="contain"
          />
          <View style={styles.logoBadge}>
            <ModernText variant="caption" color="white" weight="bold">
              8th Edition
            </ModernText>
          </View>
        </View>
        
        <ModernText variant="display" color="white" weight="bold" align="center" style={styles.headerTitle}>
          E-Week 2025
        </ModernText>
        <ModernText variant="title" color="accent" weight="semibold" align="center" style={styles.headerSubtitle}>
          ODYSSEY
        </ModernText>
        <ModernText variant="body" color="white" align="center" style={styles.headerDescription}>
          A Journey of Innovation
        </ModernText>
        <ModernText variant="bodySmall" color="white" align="center" style={styles.headerOrganizer}>
          University of Jaffna • Faculty of Engineering
        </ModernText>
        
        <View style={styles.headerStats}>
          {stats.slice(0, 2).map((stat, index) => (
            <View key={index} style={styles.headerStat}>
              <Ionicons name={stat.icon} size={20} color={MODERN_COLORS.accent} />
              <ModernText variant="body" color="white" weight="bold">
                {stat.value}
              </ModernText>
              <ModernText variant="caption" color="white" style={styles.statLabel}>
                {stat.label}
              </ModernText>
            </View>
          ))}
        </View>
      </View>
    </ModernCard>
  );

  const renderAboutSection = () => (
    <ModernCard variant="elevated" style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Ionicons name="information-circle" size={24} color={MODERN_COLORS.red} />
        <ModernText variant="heading" weight="bold" style={styles.sectionTitle}>
          About E-Week 2K25
        </ModernText>
      </View>
      
      <ModernText variant="body" style={styles.aboutText}>
        <ModernText variant="body" weight="bold" color="red">
          "Engineering a better tomorrow through innovation and community engagement."
        </ModernText>
        {'\n\n'}
        The 8th Annual Engineering Week (E-Week) will be proudly organized by the Faculty of Engineering, University of Jaffna, at the Kilinochchi premises, Ariviyal Nagar, from August 30 to September 5, 2025.
      </ModernText>
      
      <ModernText variant="body" style={styles.aboutText}>
        E-Week 2K25 aims to bridge the gap between engineering knowledge and societal development, empowering undergraduates to channel their technical and creative abilities toward sustainable and impactful solutions.
      </ModernText>
      
      <ModernText variant="body" style={styles.aboutText}>
        This week-long celebration, themed "Odyssey," represents our journey through technological advancement, exploring new frontiers in engineering, design, and innovation.
      </ModernText>
    </ModernCard>
  );

  const renderStatsSection = () => (
    <ModernCard variant="elevated" style={styles.statsCard}>
      <ModernText variant="heading" weight="bold" align="center" style={styles.statsTitle}>
        Event Highlights
      </ModernText>
      
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <View style={styles.statIcon}>
              <Ionicons name={stat.icon} size={24} color={MODERN_COLORS.red} />
            </View>
            <ModernText variant="title" color="red" weight="bold" align="center">
              {stat.value}
            </ModernText>
            <ModernText variant="bodySmall" color="muted" weight="semibold" align="center">
              {stat.label}
            </ModernText>
          </View>
        ))}
      </View>
    </ModernCard>
  );

  const renderFeaturesSection = () => (
    <ModernCard variant="elevated" style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Ionicons name="sparkles" size={24} color={MODERN_COLORS.accent} />
        <ModernText variant="heading" weight="bold" style={styles.sectionTitle}>
          What to Expect
        </ModernText>
      </View>
      
      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name={feature.icon} size={20} color={MODERN_COLORS.red} />
            </View>
            <View style={styles.featureContent}>
              <ModernText variant="body" weight="bold" style={styles.featureTitle}>
                {feature.title}
              </ModernText>
              <ModernText variant="bodySmall" color="muted">
                {feature.description}
              </ModernText>
            </View>
          </View>
        ))}
      </View>
    </ModernCard>
  );

  const renderSponsorsSection = () => (
    <ModernCard variant="elevated" style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Ionicons name="business" size={24} color={MODERN_COLORS.red} />
        <ModernText variant="heading" weight="bold" style={styles.sectionTitle}>
          Our Sponsors
        </ModernText>
      </View>
      
      <ModernText variant="body" color="muted" align="center" style={styles.sponsorsDescription}>
        We are grateful to our sponsors who make E-Week possible through their generous support 
        and commitment to fostering engineering talent.
      </ModernText>
      
      <View style={styles.sponsorsContainer}>
        {sponsors.map((sponsor, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.sponsorCard}
            onPress={() => openWebsite(sponsor.website)}
          >
            <Image source={sponsor.logo} style={styles.sponsorLogo} resizeMode="contain" />
            <ModernText variant="body" weight="bold" align="center" style={styles.sponsorName}>
              {sponsor.name}
            </ModernText>
            <View style={styles.sponsorBadge}>
              <ModernText variant="caption" color="white" weight="bold">
                {sponsor.category}
              </ModernText>
            </View>
            <ModernText variant="bodySmall" color="muted" align="center" style={styles.sponsorDescription}>
              {sponsor.description}
            </ModernText>
          </TouchableOpacity>
        ))}
      </View>
    </ModernCard>
  );

  const renderDevelopersSection = () => (
    <ModernCard variant="elevated" style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Ionicons name="code-slash" size={24} color={MODERN_COLORS.red} />
        <ModernText variant="heading" weight="bold" style={styles.sectionTitle}>
          Development Team
        </ModernText>
      </View>
      
      <ModernText variant="body" color="muted" align="center" style={styles.developersDescription}>
        Meet the talented developers who brought this app to life
      </ModernText>
      
      <View style={styles.developersContainer}>
        {appDevelopers.map((dev, idx) => (
          <ModernCard key={idx} variant="bordered" style={styles.developerCard}>
            <View style={styles.developerHeader}>
              <Image source={dev.image} style={styles.developerImage} />
              <View style={styles.developerInfo}>
                <ModernText variant="body" weight="bold">
                  {dev.name}
                </ModernText>
                <ModernText variant="bodySmall" color="red" weight="semibold">
                  {dev.role}
                </ModernText>
              </View>
            </View>
            
            <ModernText variant="bodySmall" color="muted" style={styles.developerDescription}>
              {dev.description}
            </ModernText>
            
            <View style={styles.skillsContainer}>
              {dev.skills.map((skill, skillIndex) => (
                <View key={skillIndex} style={styles.skillBadge}>
                  <ModernText variant="caption" color="red" weight="semibold">
                    {skill}
                  </ModernText>
                </View>
              ))}
            </View>
            
            <ModernButton
              title="View LinkedIn"
              variant="outline"
              size="small"
              onPress={() => openWebsite(dev.linkedin)}
              style={styles.linkedinButton}
            />
          </ModernCard>
        ))}
      </View>
    </ModernCard>
  );

  const renderContactSection = () => (
    <ModernCard variant="elevated" style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Ionicons name="mail" size={24} color={MODERN_COLORS.red} />
        <ModernText variant="heading" weight="bold" style={styles.sectionTitle}>
          Contact Us
        </ModernText>
      </View>
      
      <View style={styles.contactContainer}>
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => Linking.openURL('mailto:eweek2k25@gmail.com')}
        >
          <View style={styles.contactIcon}>
            <Ionicons name="mail" size={20} color={MODERN_COLORS.red} />
          </View>
          <View style={styles.contactContent}>
            <ModernText variant="bodySmall" color="muted" weight="semibold">
              Email
            </ModernText>
            <ModernText variant="body" weight="medium">
              eweek2k25@gmail.com
            </ModernText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={MODERN_COLORS.neutral[400]} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => Linking.openURL('tel:+94761031853')}
        >
          <View style={styles.contactIcon}>
            <Ionicons name="call" size={20} color={MODERN_COLORS.red} />
          </View>
          <View style={styles.contactContent}>
            <ModernText variant="bodySmall" color="muted" weight="semibold">
              Phone
            </ModernText>
            <ModernText variant="body" weight="medium">
              +94 76 103 1853
            </ModernText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={MODERN_COLORS.neutral[400]} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openWebsite('https://www.univ.jfn.ac.lk/foeng/')}
        >
          <View style={styles.contactIcon}>
            <Ionicons name="globe" size={20} color={MODERN_COLORS.red} />
          </View>
          <View style={styles.contactContent}>
            <ModernText variant="bodySmall" color="muted" weight="semibold">
              Website
            </ModernText>
            <ModernText variant="body" weight="medium">
              www.eweek.lk
            </ModernText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={MODERN_COLORS.neutral[400]} />
        </TouchableOpacity>
        
        <View style={styles.contactItem}>
          <View style={styles.contactIcon}>
            <Ionicons name="location" size={20} color={MODERN_COLORS.red} />
          </View>
          <View style={styles.contactContent}>
            <ModernText variant="bodySmall" color="muted" weight="semibold">
              Location
            </ModernText>
            <ModernText variant="body" weight="medium">
              Faculty of Engineering{'\n'}
              University of Jaffna{'\n'}
              Ariviyal Nagar, Kilinochchi
            </ModernText>
          </View>
        </View>
      </View>
    </ModernCard>
  );

  const renderSocialMedia = () => (
    <ModernCard variant="elevated" style={styles.socialCard}>
      <ModernText variant="heading" weight="bold" align="center" style={styles.socialTitle}>
        Follow Our Journey
      </ModernText>
      <ModernText variant="body" color="muted" align="center" style={styles.socialDescription}>
        Stay updated with the latest news and behind-the-scenes content
      </ModernText>
      
      <View style={styles.socialButtons}>
        {socialMedia.map((social, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.socialButton, { backgroundColor: social.color }]}
            onPress={() => openWebsite(social.url)}
          >
            <Ionicons name={social.icon} size={24} color={MODERN_COLORS.white} />
            <ModernText variant="bodySmall" color="white" weight="semibold" style={styles.socialButtonText}>
              {social.name}
            </ModernText>
          </TouchableOpacity>
        ))}
      </View>
    </ModernCard>
  );

  const renderAppInfo = () => (
    <ModernCard variant="bordered" style={styles.appInfoCard}>
      <View style={styles.appInfoContent}>
        <Ionicons name="phone-portrait" size={32} color={MODERN_COLORS.neutral[400]} />
        <View style={styles.appInfoText}>
          <ModernText variant="body" weight="bold">
            E-Week 2025 App v1.0.3
          </ModernText>
          <ModernText variant="bodySmall" color="muted" align="center" style={styles.appInfoDescription}>
            Developed by the E-Week Technical Team{'\n'}
            © 2025 University of Jaffna, Faculty of Engineering
          </ModernText>
        </View>
      </View>
    </ModernCard>
  );

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={[MODERN_COLORS.background.primary, MODERN_COLORS.background.secondary]}
        style={styles.backgroundGradient}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {renderAboutSection()}
        {renderStatsSection()}
        {renderFeaturesSection()}
        {renderSponsorsSection()}
        {renderDevelopersSection()}
        {renderContactSection()}
        {renderSocialMedia()}
        {renderAppInfo()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MODERN_COLORS.background.primary,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: MODERN_SPACING.md,
    paddingBottom: MODERN_SPACING['2xl'],
  },
  
  // Header
  headerCard: {
    marginBottom: MODERN_SPACING.lg,
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  headerPattern: {
    ...StyleSheet.absoluteFillObject,
  },
  patternCircle1: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  patternCircle3: {
    position: 'absolute',
    top: 100,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(167, 28, 32, 0.1)',
  },
  headerContent: {
    padding: MODERN_SPACING['2xl'],
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: MODERN_SPACING.lg,
    position: 'relative',
  },
  eweekLogo: {
    width: 100,
    height: 100,
    marginBottom: MODERN_SPACING.sm,
  },
  logoBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: MODERN_COLORS.accent,
    paddingHorizontal: MODERN_SPACING.sm,
    paddingVertical: MODERN_SPACING.xs,
    borderRadius: 12,
    ...MODERN_SHADOWS.sm,
  },
  headerTitle: {
    marginBottom: MODERN_SPACING.xs,
  },
  headerSubtitle: {
    marginBottom: MODERN_SPACING.sm,
    letterSpacing: 2,
  },
  headerDescription: {
    marginBottom: MODERN_SPACING.sm,
    opacity: 0.9,
    fontStyle: 'italic',
  },
  headerOrganizer: {
    marginBottom: MODERN_SPACING.xl,
    opacity: 0.8,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  headerStat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    opacity: 0.8,
    marginTop: MODERN_SPACING.xs,
  },
  
  // Sections
  sectionCard: {
    marginBottom: MODERN_SPACING.lg,
    padding: MODERN_SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: MODERN_SPACING.lg,
  },
  sectionTitle: {
    marginLeft: MODERN_SPACING.sm,
  },
  
  // About
  aboutText: {
    lineHeight: 24,
    marginBottom: MODERN_SPACING.md,
    textAlign: 'justify',
  },
  
  // Stats
  statsCard: {
    marginBottom: MODERN_SPACING.lg,
    padding: MODERN_SPACING.lg,
    alignItems: 'center',
  },
  statsTitle: {
    marginBottom: MODERN_SPACING.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: MODERN_SPACING.lg,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: MODERN_COLORS.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: MODERN_SPACING.sm,
    borderWidth: 2,
    borderColor: MODERN_COLORS.red,
  },
  
  // Features
  featuresGrid: {
    gap: MODERN_SPACING.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: MODERN_SPACING.md,
    backgroundColor: MODERN_COLORS.background.tertiary,
    borderRadius: 16,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: MODERN_COLORS.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: MODERN_SPACING.sm,
    borderWidth: 1,
    borderColor: MODERN_COLORS.red,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    marginBottom: MODERN_SPACING.xs,
  },
  
  // Sponsors
  sponsorsDescription: {
    marginBottom: MODERN_SPACING.xl,
    lineHeight: 22,
  },
  sponsorsContainer: {
    alignItems: 'center',
  },
  sponsorCard: {
    width: '100%',
    backgroundColor: MODERN_COLORS.background.tertiary,
    borderRadius: 20,
    padding: MODERN_SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MODERN_COLORS.border.light,
  },
  sponsorLogo: {
    width: 120,
    height: 80,
    marginBottom: MODERN_SPACING.md,
    borderRadius: 12,
  },
  sponsorName: {
    marginBottom: MODERN_SPACING.sm,
  },
  sponsorBadge: {
    backgroundColor: MODERN_COLORS.accent,
    paddingHorizontal: MODERN_SPACING.md,
    paddingVertical: MODERN_SPACING.xs,
    borderRadius: 16,
    marginBottom: MODERN_SPACING.sm,
  },
  sponsorDescription: {
    lineHeight: 20,
  },
  
  // Developers
  developersDescription: {
    marginBottom: MODERN_SPACING.xl,
    lineHeight: 22,
  },
  developersContainer: {
    gap: MODERN_SPACING.lg,
  },
  developerCard: {
    padding: MODERN_SPACING.lg,
  },
  developerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: MODERN_SPACING.md,
  },
  developerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: MODERN_SPACING.md,
  },
  developerInfo: {
    flex: 1,
  },
  developerDescription: {
    lineHeight: 20,
    marginBottom: MODERN_SPACING.md,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: MODERN_SPACING.md,
    gap: MODERN_SPACING.xs,
  },
  skillBadge: {
    backgroundColor: MODERN_COLORS.background.tertiary,
    paddingHorizontal: MODERN_SPACING.sm,
    paddingVertical: MODERN_SPACING.xs,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: MODERN_COLORS.red,
  },
  linkedinButton: {
    alignSelf: 'flex-start',
  },
  
  // Contact
  contactContainer: {
    gap: MODERN_SPACING.sm,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: MODERN_SPACING.md,
    backgroundColor: MODERN_COLORS.background.tertiary,
    borderRadius: 16,
  },
  contactIcon: {
    marginRight: MODERN_SPACING.sm,
    marginTop: 2,
  },
  contactContent: {
    flex: 1,
  },
  
  // Social Media
  socialCard: {
    marginBottom: MODERN_SPACING.lg,
    padding: MODERN_SPACING.xl,
    alignItems: 'center',
  },
  socialTitle: {
    marginBottom: MODERN_SPACING.sm,
  },
  socialDescription: {
    marginBottom: MODERN_SPACING.xl,
    lineHeight: 22,
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: MODERN_SPACING.md,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: MODERN_SPACING.md,
    paddingVertical: MODERN_SPACING.sm,
    borderRadius: 25,
    minWidth: 120,
    justifyContent: 'center',
    ...MODERN_SHADOWS.sm,
  },
  socialButtonText: {
    marginLeft: MODERN_SPACING.xs,
  },
  
  // App Info
  appInfoCard: {
    marginBottom: MODERN_SPACING.md,
    padding: MODERN_SPACING.lg,
  },
  appInfoContent: {
    alignItems: 'center',
    gap: MODERN_SPACING.md,
  },
  appInfoText: {
    alignItems: 'center',
  },
  appInfoDescription: {
    marginTop: MODERN_SPACING.sm,
    lineHeight: 18,
  },
});

export default AboutScreen;
