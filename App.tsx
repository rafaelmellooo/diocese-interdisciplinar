import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

import RootStackNavigator from './src/navigation';
import { ThemeStorageProvider } from './src/ThemeStorageContext';
import { Appearance, ColorSchemeName, Text, View } from 'react-native';

export default function App() {
  const themeStorage = useAsyncStorage('@theme');

  useEffect(() => {
    themeStorage
      .getItem()
      .then(theme => Appearance.setColorScheme(theme as ColorSchemeName));
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />

      <ThemeStorageProvider>
        <RootStackNavigator />
      </ThemeStorageProvider>
    </SafeAreaProvider>
  );
}