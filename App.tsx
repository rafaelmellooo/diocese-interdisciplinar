import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/screens/Home';

const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {

  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName='Home'
          screenOptions={{
            drawerPosition: 'left'
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              drawerLabel: 'Home'
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}