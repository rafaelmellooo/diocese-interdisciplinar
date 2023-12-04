import "react-native-gesture-handler";

import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Appearance, ColorSchemeName, Platform } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import * as Calendar from 'expo-calendar';

import RootStackNavigator from "./src/navigation";
import { ThemeStorageProvider } from "./src/contexts/ThemeStorageContext";
import { LocationProvider } from "./src/contexts/LocationContext";
import { CalendarProvider } from "./src/contexts/CalendarContext";
import { LoadingProvider } from "./src/contexts/LoadingContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [theme, setTheme] = useState<ColorSchemeName>();
  const [calendar, setCalendar] = useState<string>();
  const [appIsReady, setAppIsReady] = useState(false);

  const storedTheme = useAsyncStorage("@theme");
  const storedCalendar = useAsyncStorage("@calendar");

  useEffect(() => {
    Promise.all([
      loadingTheme(),
      loadingLocation(),
      loadingCalendar()
    ]).then(() => setAppIsReady(true));
  }, []);

  const loadingTheme = async () => {
    const theme = await storedTheme.getItem();

    setTheme(theme as ColorSchemeName);
    Appearance.setColorScheme(theme as ColorSchemeName);
  };

  const loadingCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status !== Calendar.PermissionStatus.GRANTED) {
      return;
    }

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const calendarId = await storedCalendar.getItem();

    if (calendarId) {
      if (calendars.some(calendar => calendar.id === calendarId)) {
        setCalendar(calendarId);
        return;
      }
    } else {
      const currentCalendar = calendars.find(calendar => calendar.title === 'Diocese de Santos');

      if (currentCalendar) {
        await storedCalendar.setItem(currentCalendar.id);
        setCalendar(currentCalendar.id);

        return;
      }
    }

    let newCalendar: string;

    if (Platform.OS === 'ios') {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();

      newCalendar = await Calendar.createCalendarAsync({
        type: Calendar.EntityTypes.EVENT,
        color: '#1386F2',
        title: 'Diocese de Santos',
        source: defaultCalendar.source,
        entityType: Calendar.EntityTypes.EVENT
      });
    } else {
      newCalendar = await Calendar.createCalendarAsync({
        type: Calendar.EntityTypes.EVENT,
        color: '#1386F2',
        title: 'Diocese de Santos',
        name: 'Diocese de Santos',
        source: {
          isLocalAccount: true,
          name: 'Diocese de Santos',
          type: Calendar.CalendarType.LOCAL
        },
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
        ownerAccount: 'Diocese de Santos'
      });
    }

    await storedCalendar.setItem(newCalendar);
    setCalendar(newCalendar);
  };

  const loadingLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== Location.PermissionStatus.GRANTED) {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!location) {
    return null;
  }

  if (!calendar) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="light" />

      <LoadingProvider>
        <ThemeStorageProvider theme={theme}>
          <LocationProvider location={location}>
            <CalendarProvider calendar={calendar}>
              <RootStackNavigator />
            </CalendarProvider>
          </LocationProvider>
        </ThemeStorageProvider>
      </LoadingProvider>
    </SafeAreaProvider>
  );
}
