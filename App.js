import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { COLORS } from './src/constants/colors';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={COLORS.PRIMARY_DARK} />
        <MainNavigator user={user} onLogout={handleLogout} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
