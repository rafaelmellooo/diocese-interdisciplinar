import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'

import Home from './screens/Home';
import Schedules from './screens/Schedules';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomDrawer from './components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function RootNavigation() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Schedules'
        drawerContent={(props) => (
          <CustomDrawer {...props} />
        )}
        screenOptions={{
          header: (props) => (
            <View style={{
              paddingTop: insets.top,
              backgroundColor: '#0D2744',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                color: props.options.headerTintColor,
                fontSize: 20,
                fontWeight: 'bold',
                padding: 20
              }}>
                {props.options.drawerLabel?.toString()}
              </Text>
              <DrawerToggleButton tintColor={props.options.headerTintColor} />
            </View>
          ),
          drawerPosition: 'right',
          headerStyle: {
            backgroundColor: '#0D2744',
          },
          headerTintColor: '#F5F3F3',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabelStyle: {
            color: '#0D2744',
            fontWeight: 'bold',
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Localizar Missas',
            drawerLabel: 'Missas',
            drawerIcon: (props) => (
              <Ionicons name='time' color='#0D2744' size={props.size} />
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
              <Ionicons name='calendar' color='#0D2744' size={props.size} />
            )
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}