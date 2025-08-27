import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';

const HelpSupportScreen = ({ navigation }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqData = [
    {
      id: 1,
      question: 'How do I register for events?',
      answer: 'To register for events, navigate to the Events tab, find the event you want to join, and tap "Register Now". Fill out the registration form with your details and submit.'
    },
    {
      id: 2,
      question: 'Can I edit my registration after submitting?',
      answer: 'Yes, you can edit your registration details up to 24 hours before the event starts. Go to your Profile > My Registrations to make changes.'
    },
    {
      id: 3,
      question: 'How are teams formed for team events?',
      answer: 'For team events, you can register as a team captain and add team members during registration. Each team member must have a valid registration number from the same batch.'
    },
    {
      id: 4,
      question: 'What if I forget my password?',
      answer: 'Use the "Forgot Password" link on the login screen. Enter your email address and you\'ll receive a password reset link.'
    },
    {
      id: 5,
      question: 'How do I check event schedules?',
      answer: 'Go to the Events tab and select "Schedule" to view the complete 7-day event timeline with dates, times, and locations.'
    },
    {
      id: 6,
      question: 'Can I register for multiple events?',
      answer: 'Yes, you can register for multiple events as long as they don\'t conflict with each other and you meet the eligibility criteria.'
    },
    {
      id: 7,
      question: 'How do I contact event organizers?',
      answer: 'You can reach out through this Help & Support section or contact the E22 organizing committee directly through the provided contact information.'
    },
    {
      id: 8,
      question: 'What happens if an event is cancelled?',
      answer: 'If an event is cancelled, all registered participants will be notified immediately via push notifications and email. Refunds (if applicable) will be processed automatically.'
    }
  ];

  const supportOptions = [
    {
      title: 'Contact Support',
      description: 'Send us a message and we\'ll get back to you',
      icon: 'mail',
      action: () => setShowContactModal(true)
    },
    {
      title: 'Call Support',
      description: 'Speak directly with our support team',
      icon: 'call',
      action: () => Linking.openURL('tel:+94701234567')
    },
    {
      title: 'WhatsApp Support',
      description: 'Chat with us on WhatsApp',
      icon: 'logo-whatsapp',
      action: () => Linking.openURL('https://wa.me/94701234567')
    },
    {
      title: 'Email Support',
      description: 'Send us an email',
      icon: 'mail-outline',
      action: () => Linking.openURL('mailto:support@eweek2025.com')
    }
  ];

  const handleFAQToggle = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactSubmit = async () => {
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert(
        'Message Sent',
        'Your support request has been submitted. We\'ll get back to you within 24 hours.',
        [{ text: 'OK', onPress: () => setShowContactModal(false) }]
      );
      setContactForm({ subject: '', message: '', priority: 'medium' });
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFAQItem = (item) => (
    <View key={item.id} style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqQuestion}
        onPress={() => handleFAQToggle(item.id)}
      >
        <Text style={styles.faqQuestionText}>{item.question}</Text>
        <Ionicons
          name={expandedFAQ === item.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={COLORS.PRIMARY_RED}
        />
      </TouchableOpacity>
      {expandedFAQ === item.id && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{item.answer}</Text>
        </View>
      )}
    </View>
  );

  const renderSupportOption = (option) => (
    <TouchableOpacity
      key={option.title}
      style={styles.supportOption}
      onPress={option.action}
    >
      <View style={styles.supportIcon}>
        <Ionicons name={option.icon} size={24} color={COLORS.PRIMARY_RED} />
      </View>
      <View style={styles.supportContent}>
        <Text style={styles.supportTitle}>{option.title}</Text>
        <Text style={styles.supportDescription}>{option.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.GRAY_MEDIUM} />
    </TouchableOpacity>
  );

  const renderContactModal = () => (
    <Modal
      visible={showContactModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowContactModal(false)}
    >
      <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowContactModal(false)}
          >
            <Ionicons name="close" size={24} color={COLORS.PRIMARY_DARK} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Contact Support</Text>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Subject *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Brief description of your issue"
              placeholderTextColor={COLORS.GRAY_MEDIUM}
              value={contactForm.subject}
              onChangeText={(value) => setContactForm(prev => ({ ...prev, subject: value }))}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Priority</Text>
            <View style={styles.priorityContainer}>
              {['low', 'medium', 'high'].map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    contactForm.priority === priority && styles.priorityButtonSelected
                  ]}
                  onPress={() => setContactForm(prev => ({ ...prev, priority }))}
                >
                  <Text style={[
                    styles.priorityButtonText,
                    contactForm.priority === priority && styles.priorityButtonTextSelected
                  ]}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message *</Text>
            <TextInput
              style={[styles.textInput, styles.messageInput]}
              placeholder="Describe your issue or question in detail..."
              placeholderTextColor={COLORS.GRAY_MEDIUM}
              value={contactForm.message}
              onChangeText={(value) => setContactForm(prev => ({ ...prev, message: value }))}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleContactSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <View style={styles.loadingContainer}>
                <View style={styles.spinner} />
                <Text style={styles.submitButtonText}>Sending...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Send Message</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </Modal>
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
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Help</Text>
          <View style={styles.sectionContent}>
            {supportOptions.map(renderSupportOption)}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqData.map(renderFAQItem)}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyContainer}>
          <Ionicons name="warning" size={20} color={COLORS.DANGER} />
          <Text style={styles.emergencyText}>
            For urgent issues during events, contact the organizing committee directly at +94 70 123 4567
          </Text>
        </View>
      </ScrollView>

      {renderContactModal()}
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
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 2,
  },
  supportDescription: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    lineHeight: 16,
  },
  faqContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.LIGHT,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
  },
  faqAnswer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0,
  },
  faqAnswerText: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    lineHeight: 20,
  },
  emergencyContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.DANGER,
    marginBottom: 20,
  },
  emergencyText: {
    fontSize: 12,
    color: COLORS.PRIMARY_DARK,
    marginLeft: 12,
    lineHeight: 18,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  modalCloseButton: {
    padding: 8,
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    flex: 1,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.PRIMARY_DARK,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
  messageInput: {
    height: 120,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
    backgroundColor: COLORS.PRIMARY_WHITE,
    alignItems: 'center',
  },
  priorityButtonSelected: {
    backgroundColor: COLORS.PRIMARY_RED,
    borderColor: COLORS.PRIMARY_RED,
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_DARK,
  },
  priorityButtonTextSelected: {
    color: COLORS.PRIMARY_WHITE,
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY_RED,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_WHITE,
    borderTopColor: 'transparent',
    marginRight: 8,
  },
});

export default HelpSupportScreen;
