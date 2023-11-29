import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'

import Home from './screens/Home';
import Schedules from './screens/Schedules';

const Drawer = createDrawerNavigator();

export default function RootNavigation() {
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
            title: 'Localizar Missas',
            drawerLabel: 'Missas',
            drawerIcon: (props) => (
              <Ionicons name='time' color={props.color} size={props.size} />
            )
          }}
        />
        <Drawer.Screen
          name="Schedules"
          component={Schedules}
          options={{
            title: 'Meus Agendamentos',
            drawerLabel: 'Agendamentos',
            drawerIcon: (props) => (
              <Ionicons name='calendar' color={props.color} size={props.size} />
            )
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}