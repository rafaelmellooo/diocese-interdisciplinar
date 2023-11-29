import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'

import Home from './screens/Home';
import Schedules from './screens/Schedules';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomDrawer from './components/CustomDrawer';
import NewSchedule from './screens/NewSchedule';
import DailyVerse from './screens/DailyVerse';
import { useThemeStorage } from './ThemeStorageContext';
import { DarkTheme } from './themes/DarkTheme';
import { DefaultTheme } from './themes/DefaultTheme';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  NewSchedule: {
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
            <Ionicons name='time' color={colors.text} size={props.size} />
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
          name="NewSchedule"
          component={NewSchedule}
          options={{
            title: 'Novo Agendamento',
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