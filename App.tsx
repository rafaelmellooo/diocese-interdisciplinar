import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStackNavigator from './src/navigation';

export default function App() {
  useEffect(() => {
    //AsyncStorage.removeItem('schedules');
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}