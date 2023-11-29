import 'react-native-gesture-handler';

import RootNavigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootNavigation />
    </SafeAreaProvider>
  );
}