import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/screens/Home';

const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {

  }, []);

  return (
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
  );
}