import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import AboutEWeekScreen from '../screens/AboutEWeekScreen';
import { COLORS } from '../constants/colors';

const Stack = createStackNavigator();

export default function ProfileStackNavigator({ user, onLogout }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.PRIMARY_WHITE },
      }}
    >
      <Stack.Screen name="ProfileMain">
        {(props) => <ProfileScreen {...props} user={user} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="AboutEWeek" component={AboutEWeekScreen} />
    </Stack.Navigator>
  );
}
