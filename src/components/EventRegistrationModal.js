import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
  Picker,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';

const EventRegistrationModal = ({ event, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    eventId: '',
    batch: '',
    teamName: '',
    teamSize: 1,
    isTeamEvent: false,
    maxTeamsPerBatch: 0,
    maxPlayersPerBatch: 0,
    participants: [
      {
        name: '',
        registrationNumber: '',
        contactNumber: '',
        email: '',
        isCaptain: true,
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationStats, setRegistrationStats] = useState({});

  const batches = ['E20', 'E21', 'E22', 'E23', 'E24', 'Staff'];

  useEffect(() => {
    if (event && isOpen) {
      const isTeam = event.type === 'team';
      const maxTeams = event.maxTeamsPerBatch || 2;
      const maxPlayers = event.maxPlayersPerBatch || 20;
      const teamSize = isTeam ? event.playersPerTeam || 4 : 1;

      setFormData({
        eventId: event.id,
        batch: '',
        teamName: isTeam ? '' : `${event.name} - Individual`,
        teamSize: teamSize,
        isTeamEvent: isTeam,
        maxTeamsPerBatch: maxTeams,
        maxPlayersPerBatch: maxPlayers,
        participants: Array.from({ length: teamSize }, (_, index) => ({
          name: '',
          registrationNumber: '',
          contactNumber: '',
          email: '',
          isCaptain: index === 0,
        })),
      });

      fetchRegistrationStats(event.id);
    }
  }, [event, isOpen]);

  const fetchRegistrationStats = (eventId) => {
    const mockStats = {
      E20: { teams: 1, players: 15 },
      E21: { teams: 2, players: 18 },
      E22: { teams: 1, players: 12 },
      E23: { teams: 0, players: 8 },
      E24: { teams: 0, players: 5 },
      Staff: { teams: 0, players: 2 },
    };
    setRegistrationStats(mockStats);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.batch) {
      newErrors.batch = 'Please select your batch';
    }

    if (formData.batch) {
      const currentStats = registrationStats[formData.batch] || {
        teams: 0,
        players: 0,
      };

      if (formData.isTeamEvent) {
        if (currentStats.teams >= formData.maxTeamsPerBatch) {
          newErrors.batch = `Maximum ${formData.maxTeamsPerBatch} teams already registered for ${formData.batch}`;
        }
        if (!formData.teamName.trim()) {
          newErrors.teamName = 'Team name is required';
        }
      } else {
        if (currentStats.players >= formData.maxPlayersPerBatch) {
          newErrors.batch = `Maximum ${formData.maxPlayersPerBatch} players already registered for ${formData.batch}`;
        }
      }
    }

    formData.participants.forEach((participant, index) => {
      if (!participant.name.trim()) {
        newErrors[`participant_${index}_name`] = 'Name is required';
      }
      if (!participant.registrationNumber.trim()) {
        newErrors[`participant_${index}_registrationNumber`] = 'Registration number is required';
      }
      if (!participant.contactNumber.trim()) {
        newErrors[`participant_${index}_contactNumber`] = 'Contact number is required';
      } else if (!/^\d{10}$/.test(participant.contactNumber.replace(/\s/g, ''))) {
        newErrors[`participant_${index}_contactNumber`] = 'Please enter a valid 10-digit contact number';
      }
      if (!participant.email.trim()) {
        newErrors[`participant_${index}_email`] = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(participant.email)) {
        newErrors[`participant_${index}_email`] = 'Please enter a valid email address';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };

    setFormData(prev => ({
      ...prev,
      participants: updatedParticipants,
    }));

    const errorKey = `participant_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const addParticipant = () => {
    if (formData.participants.length < formData.teamSize) {
      setFormData(prev => ({
        ...prev,
        participants: [
          ...prev.participants,
          {
            name: '',
            registrationNumber: '',
            contactNumber: '',
            email: '',
            isCaptain: false,
          },
        ],
      }));
    }
  };

  const removeParticipant = (index) => {
    if (formData.participants.length > 1 && !formData.participants[index].isCaptain) {
      const updatedParticipants = formData.participants.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        participants: updatedParticipants,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const registrationData = {
        ...formData,
        eventName: event.name,
        submittedAt: new Date().toISOString(),
      };

      Alert.alert(
        'Registration Successful',
        `You have been registered for ${event.name}`,
        [{ text: 'OK', onPress: () => onClose() }]
      );

      onSubmit(registrationData);
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentStats = () => {
    if (!formData.batch) return null;
    return registrationStats[formData.batch] || { teams: 0, players: 0 };
  };

  const canRegister = () => {
    if (!formData.batch) return true;
    const stats = getCurrentStats();
    if (formData.isTeamEvent) {
      return stats.teams < formData.maxTeamsPerBatch;
    } else {
      return stats.players < formData.maxPlayersPerBatch;
    }
  };

  if (!isOpen || !event) return null;

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.PRIMARY_DARK} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Register for {event.name}</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Event Info */}
          <View style={styles.eventInfo}>
            <View style={styles.eventMeta}>
              <Ionicons name="calendar" size={16} color={COLORS.PRIMARY_RED} />
              <Text style={styles.eventMetaText}>{event.date}</Text>
            </View>
            <View style={styles.eventMeta}>
              <Ionicons name="time" size={16} color={COLORS.PRIMARY_RED} />
              <Text style={styles.eventMetaText}>{event.time}</Text>
            </View>
            <View style={styles.eventMeta}>
              <Ionicons name="location" size={16} color={COLORS.PRIMARY_RED} />
              <Text style={styles.eventMetaText}>{event.location}</Text>
            </View>
          </View>

          {/* Event Type */}
          <View style={styles.eventTypeContainer}>
            <View style={[styles.eventTypeBadge, { backgroundColor: formData.isTeamEvent ? COLORS.PRIMARY_RED : COLORS.SUCCESS }]}>
              <Ionicons 
                name={formData.isTeamEvent ? 'people' : 'person'} 
                size={16} 
                color={COLORS.PRIMARY_WHITE} 
              />
              <Text style={styles.eventTypeText}>
                {formData.isTeamEvent 
                  ? `Team Event (${formData.teamSize} players)` 
                  : 'Individual Event'
                }
              </Text>
            </View>
            <Text style={styles.eventLimits}>
              Max {formData.isTeamEvent ? formData.maxTeamsPerBatch + ' teams' : formData.maxPlayersPerBatch + ' players'} per batch
            </Text>
          </View>

          {/* Batch Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Select Your Batch *</Text>
            <View style={styles.batchContainer}>
              {batches.map(batch => (
                <TouchableOpacity
                  key={batch}
                  style={[
                    styles.batchButton,
                    formData.batch === batch && styles.batchButtonSelected
                  ]}
                  onPress={() => handleInputChange('batch', batch)}
                >
                  <Text style={[
                    styles.batchButtonText,
                    formData.batch === batch && styles.batchButtonTextSelected
                  ]}>
                    {batch}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.batch && (
              <Text style={styles.errorText}>{errors.batch}</Text>
            )}
          </View>

          {/* Registration Status */}
          {formData.batch && (
            <View style={styles.registrationStatus}>
              <Text style={styles.statusTitle}>Current Registration Status for {formData.batch}</Text>
              <View style={styles.statusItem}>
                <Text style={styles.statusNumber}>
                  {formData.isTeamEvent 
                    ? `${getCurrentStats()?.teams || 0} / ${formData.maxTeamsPerBatch}`
                    : `${getCurrentStats()?.players || 0} / ${formData.maxPlayersPerBatch}`
                  }
                </Text>
                <Text style={styles.statusLabel}>
                  {formData.isTeamEvent ? 'Teams Registered' : 'Players Registered'}
                </Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      {
                        width: `${formData.isTeamEvent 
                          ? ((getCurrentStats()?.teams || 0) / formData.maxTeamsPerBatch) * 100
                          : ((getCurrentStats()?.players || 0) / formData.maxPlayersPerBatch) * 100
                        }%`
                      }
                    ]}
                  />
                </View>
              </View>
              {!canRegister() && (
                <View style={styles.warningContainer}>
                  <Ionicons name="warning" size={16} color={COLORS.WARNING} />
                  <Text style={styles.warningText}>Registration limit reached for {formData.batch}</Text>
                </View>
              )}
            </View>
          )}

          {/* Team Name */}
          {formData.isTeamEvent && (
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Team Name *</Text>
              <TextInput
                style={[styles.textInput, errors.teamName && styles.inputError]}
                placeholder="Enter your team name"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={formData.teamName}
                onChangeText={(value) => handleInputChange('teamName', value)}
              />
              {errors.teamName && (
                <Text style={styles.errorText}>{errors.teamName}</Text>
              )}
            </View>
          )}

          {/* Participants */}
          <View style={styles.participantsSection}>
            <Text style={styles.sectionTitle}>
              {formData.isTeamEvent ? 'Team Members' : 'Participant Details'}
              <Text style={styles.participantCount}> ({formData.participants.length} / {formData.teamSize})</Text>
            </Text>
            
            {formData.participants.map((participant, index) => (
              <View key={index} style={styles.participantCard}>
                <View style={styles.participantHeader}>
                  <View style={styles.participantTitle}>
                    <Ionicons 
                      name={participant.isCaptain ? 'star' : 'person'} 
                      size={16} 
                      color={participant.isCaptain ? COLORS.ACCENT : COLORS.PRIMARY_RED} 
                    />
                    <Text style={styles.participantTitleText}>
                      {formData.isTeamEvent 
                        ? (participant.isCaptain ? 'Team Captain' : `Team Member ${index}`)
                        : 'Participant'
                      }
                    </Text>
                  </View>
                  {!participant.isCaptain && formData.participants.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeParticipant(index)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="close" size={16} color={COLORS.DANGER} />
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.participantForm}>
                  <TextInput
                    style={[styles.textInput, styles.smallInput, errors[`participant_${index}_name`] && styles.inputError]}
                    placeholder="Full Name *"
                    placeholderTextColor={COLORS.GRAY_MEDIUM}
                    value={participant.name}
                    onChangeText={(value) => handleParticipantChange(index, 'name', value)}
                  />
                  {errors[`participant_${index}_name`] && (
                    <Text style={styles.errorText}>{errors[`participant_${index}_name`]}</Text>
                  )}

                  <TextInput
                    style={[styles.textInput, styles.smallInput, errors[`participant_${index}_registrationNumber`] && styles.inputError]}
                    placeholder="Registration Number *"
                    placeholderTextColor={COLORS.GRAY_MEDIUM}
                    value={participant.registrationNumber}
                    onChangeText={(value) => handleParticipantChange(index, 'registrationNumber', value)}
                  />
                  {errors[`participant_${index}_registrationNumber`] && (
                    <Text style={styles.errorText}>{errors[`participant_${index}_registrationNumber`]}</Text>
                  )}

                  <TextInput
                    style={[styles.textInput, styles.smallInput, errors[`participant_${index}_contactNumber`] && styles.inputError]}
                    placeholder="Contact Number *"
                    placeholderTextColor={COLORS.GRAY_MEDIUM}
                    value={participant.contactNumber}
                    onChangeText={(value) => handleParticipantChange(index, 'contactNumber', value)}
                    keyboardType="phone-pad"
                  />
                  {errors[`participant_${index}_contactNumber`] && (
                    <Text style={styles.errorText}>{errors[`participant_${index}_contactNumber`]}</Text>
                  )}

                  <TextInput
                    style={[styles.textInput, styles.smallInput, errors[`participant_${index}_email`] && styles.inputError]}
                    placeholder="Email Address *"
                    placeholderTextColor={COLORS.GRAY_MEDIUM}
                    value={participant.email}
                    onChangeText={(value) => handleParticipantChange(index, 'email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors[`participant_${index}_email`] && (
                    <Text style={styles.errorText}>{errors[`participant_${index}_email`]}</Text>
                  )}
                </View>
              </View>
            ))}

            {formData.isTeamEvent && formData.participants.length < formData.teamSize && (
              <TouchableOpacity style={styles.addParticipantButton} onPress={addParticipant}>
                <Ionicons name="add" size={20} color={COLORS.PRIMARY_RED} />
                <Text style={styles.addParticipantText}>Add Team Member</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <TouchableOpacity
              style={[styles.submitButton, (!canRegister() || isSubmitting) && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!canRegister() || isSubmitting}
            >
              {isSubmitting ? (
                <View style={styles.loadingContainer}>
                  <View style={styles.spinner} />
                  <Text style={styles.submitButtonText}>Submitting...</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.PRIMARY_WHITE} />
                  <Text style={styles.submitButtonText}>Submit Registration</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
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
  closeButton: {
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
  eventInfo: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...SHADOWS.LIGHT,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventMetaText: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    marginLeft: 8,
  },
  eventTypeContainer: {
    marginBottom: 20,
  },
  eventTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  eventTypeText: {
    color: COLORS.PRIMARY_WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  eventLimits: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 8,
  },
  batchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  batchButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  batchButtonSelected: {
    backgroundColor: COLORS.PRIMARY_RED,
    borderColor: COLORS.PRIMARY_RED,
  },
  batchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_DARK,
  },
  batchButtonTextSelected: {
    color: COLORS.PRIMARY_WHITE,
  },
  registrationStatus: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...SHADOWS.LIGHT,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 12,
  },
  statusItem: {
    alignItems: 'center',
    marginBottom: 12,
  },
  statusNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_RED,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY_RED,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
  },
  warningText: {
    fontSize: 12,
    color: COLORS.WARNING,
    marginLeft: 8,
    fontWeight: '500',
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
  smallInput: {
    marginBottom: 12,
  },
  inputError: {
    borderColor: COLORS.DANGER,
  },
  errorText: {
    fontSize: 11,
    color: COLORS.DANGER,
    marginTop: 4,
    marginLeft: 4,
  },
  participantsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 16,
  },
  participantCount: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    fontWeight: 'normal',
  },
  participantCard: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.LIGHT,
  },
  participantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginLeft: 6,
  },
  removeButton: {
    padding: 4,
  },
  participantForm: {
    gap: 0,
  },
  addParticipantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_RED,
    borderStyle: 'dashed',
  },
  addParticipantText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY_RED,
    marginLeft: 8,
  },
  submitContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY_RED,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginLeft: 8,
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

export default EventRegistrationModal;
