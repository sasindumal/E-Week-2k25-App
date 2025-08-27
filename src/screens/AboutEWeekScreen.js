import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';

const AboutEWeekScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('about');

  const appInfo = {
    version: '2.1.0',
    buildNumber: '2025.1',
    lastUpdated: 'February 10, 2025',
    developer: 'E22 Development Team',
    platform: 'React Native',
  };

  const teamMembers = [
    { name: 'John Doe', role: 'Project Lead', batch: 'E22', avatar: 'J' },
    { name: 'Jane Smith', role: 'UI/UX Designer', batch: 'E22', avatar: 'J' },
    { name: 'Mike Johnson', role: 'Backend Developer', batch: 'E22', avatar: 'M' },
    { name: 'Sarah Wilson', role: 'Frontend Developer', batch: 'E22', avatar: 'S' },
    { name: 'Alex Brown', role: 'QA Engineer', batch: 'E22', avatar: 'A' },
    { name: 'Lisa Davis', role: 'DevOps Engineer', batch: 'E22', avatar: 'L' },
  ];

  const features = [
    { title: 'Event Registration', description: 'Easy registration for all E Week events' },
    { title: 'Real-time Updates', description: 'Live updates on events and schedules' },
    { title: 'Leaderboard', description: 'Track your batch rankings' },
    { title: 'Profile Management', description: 'Manage your account and preferences' },
    { title: 'Notifications', description: 'Stay updated with push notifications' },
    { title: 'Odyssey Animation', description: 'Beautiful space-themed animations' },
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: 'logo-facebook', url: 'https://facebook.com/eweek2025' },
    { platform: 'Instagram', icon: 'logo-instagram', url: 'https://instagram.com/eweek2025' },
    { platform: 'Twitter', icon: 'logo-twitter', url: 'https://twitter.com/eweek2025' },
    { platform: 'LinkedIn', icon: 'logo-linkedin', url: 'https://linkedin.com/company/eweek2025' },
    { platform: 'Website', icon: 'globe', url: 'https://eweek2025.com' },
  ];

  const handleSocialLink = (url) => {
    Linking.openURL(url);
  };

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'about' && styles.activeTab]}
        onPress={() => setSelectedTab('about')}
      >
        <Text style={[styles.tabText, selectedTab === 'about' && styles.activeTabText]}>
          About
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'team' && styles.activeTab]}
        onPress={() => setSelectedTab('team')}
      >
        <Text style={[styles.tabText, selectedTab === 'team' && styles.activeTabText]}>
          Team
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'app' && styles.activeTab]}
        onPress={() => setSelectedTab('app')}
      >
        <Text style={[styles.tabText, selectedTab === 'app' && styles.activeTabText]}>
          App Info
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderAboutTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>E</Text>
        </View>
        <Text style={styles.appTitle}>E Week 2025</Text>
        <Text style={styles.appSubtitle}>ODYSSEY</Text>
        <Text style={styles.organizer}>Organized by E22</Text>
      </View>

      {/* Mission */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <View style={styles.card}>
          <Text style={styles.missionText}>
            E Week 2025: Odyssey represents a journey of exploration, innovation, and excellence. 
            We bring together the brightest minds in engineering to compete, collaborate, and celebrate 
            the spirit of engineering at the University of Peradeniya.
          </Text>
        </View>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Features</Text>
        <View style={styles.card}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.SUCCESS} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Social Media */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialContainer}>
          {socialLinks.map((social, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialButton}
              onPress={() => handleSocialLink(social.url)}
            >
              <Ionicons name={social.icon} size={24} color={COLORS.PRIMARY_WHITE} />
              <Text style={styles.socialButtonText}>{social.platform}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.card}>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={20} color={COLORS.PRIMARY_RED} />
            <Text style={styles.contactText}>info@eweek2025.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={20} color={COLORS.PRIMARY_RED} />
            <Text style={styles.contactText}>+94 81 239 3200</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location" size={20} color={COLORS.PRIMARY_RED} />
            <Text style={styles.contactText}>Faculty of Engineering, University of Peradeniya</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderTeamTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Development Team</Text>
        <Text style={styles.teamDescription}>
          Meet the talented E22 students who brought this app to life
        </Text>
        <View style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>{member.avatar}</Text>
              </View>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
              <Text style={styles.memberBatch}>{member.batch}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Acknowledgments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Thanks</Text>
        <View style={styles.card}>
          <Text style={styles.acknowledgeText}>
            • Faculty of Engineering, University of Peradeniya{'\n'}
            • E Week Organizing Committee{'\n'}
            • All participating students and staff{'\n'}
            • Beta testers who helped improve the app{'\n'}
            • Open source community for amazing libraries
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderAppTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* App Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application Details</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>{appInfo.version}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build Number</Text>
            <Text style={styles.infoValue}>{appInfo.buildNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>{appInfo.lastUpdated}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Developer</Text>
            <Text style={styles.infoValue}>{appInfo.developer}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Platform</Text>
            <Text style={styles.infoValue}>{appInfo.platform}</Text>
          </View>
        </View>
      </View>

      {/* Legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <View style={styles.legalContainer}>
          <TouchableOpacity style={styles.legalButton}>
            <Text style={styles.legalButtonText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.GRAY_MEDIUM} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.legalButton}>
            <Text style={styles.legalButtonText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.GRAY_MEDIUM} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.legalButton}>
            <Text style={styles.legalButtonText}>Open Source Licenses</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.GRAY_MEDIUM} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Copyright */}
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>
          © 2025 E Week Organizing Committee{'\n'}
          Faculty of Engineering, University of Peradeniya{'\n'}
          All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );

  return (
    <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.PRIMARY_DARK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About E Week</Text>
      </View>

      <View style={styles.content}>
        {renderTabs()}
        <View style={styles.tabContent}>
          {selectedTab === 'about' && renderAboutTab()}
          {selectedTab === 'team' && renderTeamTab()}
          {selectedTab === 'app' && renderAppTab()}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
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
  tabContent: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.PRIMARY_RED,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...SHADOWS.MEDIUM,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.PRIMARY_RED,
    marginBottom: 8,
  },
  organizer: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.LIGHT,
  },
  missionText: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    lineHeight: 22,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_RED,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 100,
    justifyContent: 'center',
  },
  socialButtonText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: COLORS.PRIMARY_DARK,
    marginLeft: 12,
    flex: 1,
  },
  teamDescription: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    marginBottom: 20,
    textAlign: 'center',
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  teamMember: {
    width: '48%',
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    ...SHADOWS.LIGHT,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY_RED,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  memberName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 4,
    textAlign: 'center',
  },
  memberRole: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    marginBottom: 4,
    textAlign: 'center',
  },
  memberBatch: {
    fontSize: 10,
    color: COLORS.PRIMARY_RED,
    fontWeight: '600',
  },
  acknowledgeText: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
  },
  legalContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.LIGHT,
  },
  legalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  legalButtonText: {
    fontSize: 14,
    color: COLORS.PRIMARY_DARK,
  },
  copyrightContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  copyrightText: {
    fontSize: 10,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default AboutEWeekScreen;
