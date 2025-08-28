import React, { useState } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import OdysseyAnimation from '../components/OdysseyAnimation';

import DashboardScreen from '../screens/DashboardScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import EventsScreen from '../screens/EventsScreen';
import SkillstormScreen from '../screens/SkillstormScreen';
import AboutScreen from '../screens/AboutScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import EventDetailsScreen from '../screens/EventDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardScreen} />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ headerShown: true, title: 'Event Details' }}
      />
    </Stack.Navigator>
  );
}

export default function MainNavigator({ user, onLogout }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const getTabIndex = (routeName) => {
    const tabOrder = ['Dashboard', 'Leaderboard', 'Events', 'Skillstorm', 'Profile', 'About'];
    return tabOrder.indexOf(routeName);
  };

  return (
    <View style={{ flex: 1 }}>
      <OdysseyAnimation activeTabIndex={activeTabIndex} />
      <Tab.Navigator
        screenListeners={{
          state: (e) => {
            const index = e.data.state.index;
            const routeName = e.data.state.routes[index].name;
            setActiveTabIndex(getTabIndex(routeName));
          },
        }}
      screenOptions={({ route }) => ({
          tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: COLORS.PRIMARY_DARK,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: COLORS.PRIMARY_WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        tabBarStyle: {
              position: 'absolute',
          backgroundColor: 'rgba(17, 9, 33, 0.9)',
          borderTopWidth: 0,
          elevation: 10,
          paddingBottom: 0,
          paddingTop: 0,
          height: 70,
            marginBottom:25,
            marginHorizontal:10,
            alignItems: 'space-between',
           // justifyContent: 'center',
            borderRadius:15,
            opacity:1,
        },
        tabBarActiveTintColor: COLORS.PRIMARY_RED,
        tabBarInactiveTintColor: COLORS.GRAY_MEDIUM,
        tabBarLabelStyle: {
          fontSize: 0,
          fontWeight: '600',
          marginTop: 1,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        options={{ title: 'Dashboard' }}
        component={DashboardStack}
      />
      <Tab.Screen
        name="Leaderboard"
        options={{ title: 'Leaderboard' }}
      >
        {(props) => <LeaderboardScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Events"
        options={{ title: 'Events' }}
      >
        {(props) => <EventsScreen {...props} user={user} />}
      </Tab.Screen>
      
      <Tab.Screen
        name="About"
        options={{ title: 'About' }}
      >
        {(props) => <AboutScreen {...props} user={user} onLogout={onLogout} />}
      </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}
