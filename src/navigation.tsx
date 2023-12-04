import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'

import Home from './screens/Home';
import Reminders from './screens/Reminders';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomDrawer from './components/CustomDrawer';
import NewReminder from './screens/NewReminder';
import DailyVerse from './screens/DailyVerse';
import { DarkTheme } from './themes/DarkTheme';
import { DefaultTheme } from './themes/DefaultTheme';
import { useThemeStorage } from './contexts/ThemeStorageContext';
import Events from './screens/Events';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  NewReminder: {
    name: string;
    info: string;
    distance: string;
  };
  DailyVerse: undefined;
};

function DrawerNavigator() {
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <Drawer.Navigator
      initialRouteName='Events'
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
        headerTintColor: '#F5F3F3',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerLabelStyle: {
          color: colors.text,
          fontWeight: 'bold',
        }
      }}
    >
      <Drawer.Screen
        name="Finder"
        component={Home}
        options={{
          title: 'Localizar Missas',
          drawerLabel: 'Missas',
          drawerIcon: (props) => (
            <Ionicons name='location' color={colors.text} size={props.size} />
          )
        }}
      />

      <Drawer.Screen
        name="Schedules"
        component={Reminders}
        options={{
          title: 'Meus Lembretes',
          drawerLabel: 'Lembretes',
          drawerIcon: (props) => (
            <Ionicons name='notifications' color={colors.text} size={props.size} />
          )
        }}
      />

      <Drawer.Screen
        name="Events"
        component={Events}
        options={{
          title: 'Eventos',
          drawerLabel: 'Eventos',
          drawerIcon: (props) => (
            <Ionicons name='calendar' color={colors.text} size={props.size} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default function RootStackNavigator() {
  const { theme } = useThemeStorage();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0D2744'
          },
          headerTintColor: '#F5F3F3',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
          component={DrawerNavigator}
        />

        <Stack.Screen
          name="NewReminder"
          component={NewReminder}
          options={{
            title: 'Novo Lembrete',
          }}
        />

        <Stack.Screen
          name="DailyVerse"
          component={DailyVerse}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}