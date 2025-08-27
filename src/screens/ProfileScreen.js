import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, SHADOWS } from '../constants/colors';

const ProfileScreen = ({ user, onLogout, navigation }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    registrationNumber: user?.registrationNumber || '',
    batch: user?.batch || '',
    contactNumber: user?.contactNumber || '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const batches = ['E20', 'E21', 'E22', 'E23', 'E24', 'Staff'];

  const handleProfileUpdate = async () => {
    if (!validateProfileForm()) return;

    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!validatePasswordForm()) return;

    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Success', 'Password changed successfully!', [
        { text: 'OK', onPress: () => setShowChangePasswordModal(false) }
      ]);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!profileData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!profileData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }

    if (!profileData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(profileData.contactNumber.replace(/\s/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: onLogout }
      ]
    );
  };

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
        onPress={() => setActiveTab('profile')}
      >
        <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
        onPress={() => setActiveTab('settings')}
      >
        <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfileTab = () => (
    <View style={styles.formContainer}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profileData.fullName.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.welcomeText}>Welcome, {profileData.fullName}!</Text>
        <Text style={styles.batchText}>Batch {profileData.batch}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <View style={[styles.inputWrapper, errors.fullName && styles.inputError]}>
          <Ionicons name="person" size={20} color={COLORS.GRAY_MEDIUM} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your full name"
            placeholderTextColor={COLORS.GRAY_MEDIUM}
            value={profileData.fullName}
            onChangeText={(value) => handleInputChange('fullName', value)}
          />
        </View>
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address *</Text>
        <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
          <Ionicons name="mail" size={20} color={COLORS.GRAY_MEDIUM} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.GRAY_MEDIUM}
            value={profileData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Registration Number *</Text>
        <View style={[styles.inputWrapper, errors.registrationNumber && styles.inputError]}>
          <Ionicons name="card" size={20} color={COLORS.GRAY_MEDIUM} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="e.g., E/22/123"
            placeholderTextColor={COLORS.GRAY_MEDIUM}
            value={profileData.registrationNumber}
            onChangeText={(value) => handleInputChange('registrationNumber', value)}
          />
        </View>
        {errors.registrationNumber && <Text style={styles.errorText}>{errors.registrationNumber}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Batch *</Text>
        <View style={styles.batchContainer}>
          {batches.map((batch) => (
            <TouchableOpacity
              key={batch}
              style={[
                styles.batchButton,
                profileData.batch === batch && styles.batchButtonSelected
              ]}
              onPress={() => handleInputChange('batch', batch)}
            >
              <Text style={[
                styles.batchButtonText,
                profileData.batch === batch && styles.batchButtonTextSelected
              ]}>
                {batch}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contact Number *</Text>
        <View style={[styles.inputWrapper, errors.contactNumber && styles.inputError]}>
          <Ionicons name="call" size={20} color={COLORS.GRAY_MEDIUM} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="07XXXXXXXX"
            placeholderTextColor={COLORS.GRAY_MEDIUM}
            value={profileData.contactNumber}
            onChangeText={(value) => handleInputChange('contactNumber', value)}
            keyboardType="phone-pad"
          />
        </View>
        {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.updateButton, isUpdating && styles.updateButtonDisabled]}
        onPress={handleProfileUpdate}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <View style={styles.loadingContainer}>
            <View style={styles.spinner} />
            <Text style={styles.updateButtonText}>Updating...</Text>
          </View>
        ) : (
          <Text style={styles.updateButtonText}>Update Profile</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.settingsContainer}>
      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Ionicons name="lock-closed" size={24} color={COLORS.PRIMARY_RED} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Change Password</Text>
          <Text style={styles.settingDescription}>Update your account password</Text>
        </View>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => setShowChangePasswordModal(true)}
        >
          <Ionicons name="chevron-forward" size={20} color={COLORS.GRAY_MEDIUM} />
        </TouchableOpacity>
      </View>

      

      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Ionicons name="help-circle" size={24} color={COLORS.PRIMARY_RED} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Help & Support</Text>
          <Text style={styles.settingDescription}>Get help and contact support</Text>
        </View>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => navigation.navigate('HelpSupport')}
        >
          <Ionicons name="chevron-forward" size={20} color={COLORS.GRAY_MEDIUM} />
        </TouchableOpacity>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Ionicons name="information-circle" size={24} color={COLORS.PRIMARY_RED} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>About E Week</Text>
          <Text style={styles.settingDescription}>App version and information</Text>
        </View>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => navigation.navigate('AboutEWeek')}
        >
          <Ionicons name="chevron-forward" size={20} color={COLORS.GRAY_MEDIUM} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
        <Ionicons name="log-out" size={24} color={COLORS.PRIMARY_WHITE} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderChangePasswordModal = () => (
    <Modal
      visible={showChangePasswordModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowChangePasswordModal(false)}
    >
      <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowChangePasswordModal(false)}
          >
            <Ionicons name="close" size={24} color={COLORS.PRIMARY_DARK} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Change Password</Text>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Current Password *</Text>
            <View style={[styles.inputWrapper, errors.currentPassword && styles.inputError]}>
              <Ionicons name="lock-closed" size={20} color={COLORS.GRAY_MEDIUM} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter current password"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={passwordData.currentPassword}
                onChangeText={(value) => handlePasswordInputChange('currentPassword', value)}
                secureTextEntry={!showPasswords.current}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPasswords.current ? 'eye' : 'eye-off'} 
                  size={20} 
                  color={COLORS.GRAY_MEDIUM} 
                />
              </TouchableOpacity>
            </View>
            {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Password *</Text>
            <View style={[styles.inputWrapper, errors.newPassword && styles.inputError]}>
              <Ionicons name="lock-closed" size={20} color={COLORS.GRAY_MEDIUM} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter new password"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={passwordData.newPassword}
                onChangeText={(value) => handlePasswordInputChange('newPassword', value)}
                secureTextEntry={!showPasswords.new}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPasswords.new ? 'eye' : 'eye-off'} 
                  size={20} 
                  color={COLORS.GRAY_MEDIUM} 
                />
              </TouchableOpacity>
            </View>
            {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm New Password *</Text>
            <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
              <Ionicons name="lock-closed" size={20} color={COLORS.GRAY_MEDIUM} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm new password"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={passwordData.confirmPassword}
                onChangeText={(value) => handlePasswordInputChange('confirmPassword', value)}
                secureTextEntry={!showPasswords.confirm}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPasswords.confirm ? 'eye' : 'eye-off'} 
                  size={20} 
                  color={COLORS.GRAY_MEDIUM} 
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.changePasswordButton, isUpdating && styles.changePasswordButtonDisabled]}
            onPress={handlePasswordChange}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <View style={styles.loadingContainer}>
                <View style={styles.spinner} />
                <Text style={styles.changePasswordButtonText}>Changing...</Text>
              </View>
            ) : (
              <Text style={styles.changePasswordButtonText}>Change Password</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );

  return (
    <LinearGradient colors={[COLORS.PRIMARY_WHITE, COLORS.GRAY_LIGHT]} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderTabs()}
        
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </ScrollView>

      {renderChangePasswordModal()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
  formContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    padding: 24,
    ...SHADOWS.MEDIUM,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.PRIMARY_RED,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...SHADOWS.LIGHT,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 4,
  },
  batchText: {
    fontSize: 14,
    color: COLORS.GRAY_DARK,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
  inputError: {
    borderColor: COLORS.DANGER,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.PRIMARY_DARK,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.DANGER,
    marginTop: 4,
    marginLeft: 4,
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
  updateButton: {
    backgroundColor: COLORS.PRIMARY_RED,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonDisabled: {
    opacity: 0.7,
  },
  updateButtonText: {
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
  settingsContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.MEDIUM,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
  },
  settingButton: {
    padding: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.DANGER,
    paddingVertical: 16,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
    marginLeft: 8,
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
  changePasswordButton: {
    backgroundColor: COLORS.PRIMARY_RED,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  changePasswordButtonDisabled: {
    opacity: 0.7,
  },
  changePasswordButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
});

export default ProfileScreen;
