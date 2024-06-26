import { NavigationContainer, NavigatorScreenParams, useTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'

import Home from './screens/Home';
import Reminders from './screens/Reminders';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomDrawer from './components/CustomDrawer';
import DailyVerse from './screens/DailyVerse';
import { DarkTheme } from './themes/DarkTheme';
import { DefaultTheme } from './themes/DefaultTheme';
import { useThemeStorage } from './contexts/ThemeStorageContext';
import Events from './screens/Events';
import NewReminder from './screens/NewReminder';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

type DrawerParamList = {
  Finder: undefined;
  Schedules: undefined;
  Events: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<DrawerParamList>;
  DailyVerse: undefined;
  NewReminder: {
    name: string;
    address?: string;
  };
};

function DrawerNavigator() {
  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <Drawer.Navigator
      initialRouteName='Finder'
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
        },
        swipeEnabled: false
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
        initialRouteName='DailyVerse'
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
          name='NewReminder'
          component={NewReminder}
          options={{
            presentation: 'modal',
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