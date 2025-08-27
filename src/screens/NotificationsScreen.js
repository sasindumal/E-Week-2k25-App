import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    eventReminders: true,
    registrationUpdates: true,
    leaderboardUpdates: false,
    newEvents: true,
    systemUpdates: true,
    emailNotifications: false,
    smsNotifications: false,
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveSettings = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Notification settings updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update settings. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const renderNotificationItem = (key, title, description, icon) => (
    <View key={key} style={styles.notificationItem}>
      <View style={styles.notificationIcon}>
        <Ionicons name={icon} size={24} color={COLORS.PRIMARY_RED} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
      </View>
      <Switch
        value={notifications[key]}
        onValueChange={() => handleToggle(key)}
        trackColor={{ false: COLORS.GRAY_LIGHT, true: COLORS.PRIMARY_RED }}
        thumbColor={notifications[key] ? COLORS.PRIMARY_WHITE : COLORS.GRAY_MEDIUM}
        ios_backgroundColor={COLORS.GRAY_LIGHT}
      />
    </View>
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
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveSettings}
          disabled={isUpdating}
        >
          <Text style={styles.saveButtonText}>
            {isUpdating ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Push Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Notifications</Text>
          <View style={styles.sectionContent}>
            {renderNotificationItem(
              'pushNotifications',
              'Enable Push Notifications',
              'Receive notifications directly to your device',
              'notifications'
            )}
            {renderNotificationItem(
              'eventReminders',
              'Event Reminders',
              'Get notified before events start',
              'time'
            )}
            {renderNotificationItem(
              'registrationUpdates',
              'Registration Updates',
              'Updates about your event registrations',
              'checkmark-circle'
            )}
            {renderNotificationItem(
              'leaderboardUpdates',
              'Leaderboard Updates',
              'Notifications when rankings change',
              'trophy'
            )}
            {renderNotificationItem(
              'newEvents',
              'New Events',
              'Get notified when new events are added',
              'add-circle'
            )}
            {renderNotificationItem(
              'systemUpdates',
              'System Updates',
              'Important app updates and announcements',
              'information-circle'
            )}
          </View>
        </View>

        {/* Communication Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication Preferences</Text>
          <View style={styles.sectionContent}>
            {renderNotificationItem(
              'emailNotifications',
              'Email Notifications',
              'Receive notifications via email',
              'mail'
            )}
            {renderNotificationItem(
              'smsNotifications',
              'SMS Notifications',
              'Receive notifications via SMS',
              'chatbubble'
            )}
          </View>
        </View>

        {/* Notification Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Schedule</Text>
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Quiet Hours</Text>
              <Text style={styles.scheduleValue}>10:00 PM - 8:00 AM</Text>
              <TouchableOpacity style={styles.scheduleButton}>
                <Text style={styles.scheduleButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>Event Reminder</Text>
              <Text style={styles.scheduleValue}>30 minutes before</Text>
              <TouchableOpacity style={styles.scheduleButton}>
                <Text style={styles.scheduleButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Important Note */}
        <View style={styles.noteContainer}>
          <Ionicons name="warning" size={20} color={COLORS.WARNING} />
          <Text style={styles.noteText}>
            Disabling notifications may cause you to miss important updates about events and registrations.
          </Text>
        </View>
      </ScrollView>
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY_RED,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 16,
  },
  sectionContent: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.LIGHT,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    lineHeight: 16,
  },
  scheduleContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.LIGHT,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    flex: 1,
  },
  scheduleValue: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    marginRight: 16,
  },
  scheduleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  scheduleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.WARNING,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 12,
    color: COLORS.PRIMARY_DARK,
    marginLeft: 12,
    lineHeight: 18,
    flex: 1,
  },
});

export default NotificationsScreen;
