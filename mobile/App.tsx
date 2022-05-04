import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { RegistrationScreen } from './src/screens/registration-screen';
import { useFonts } from 'expo-font';
import { LoginScreen } from './src/screens/login-screen';
import { MainScreen } from './src/screens/main-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { BottomNavBar } from './src/components/BottomNavigationBar';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StackNavComponent } from './src/components/StackNavigation';
import { CartContextProvider } from './src/contexts/cart-context';
import { FavoriteContextProvider } from './src/contexts/favorites-context';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const Stack = createNativeStackNavigator();
  // useFonts({
  //   'JetBrainsMono': require('./assets/fonts/ttf/JetBrainsMono-Regular.ttf'),
  //   'Open-Sans': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  //   'Open-Sans-Bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
  // });

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <FavoriteContextProvider>
        <CartContextProvider>
          <NavigationContainer>
            <StackNavComponent></StackNavComponent>
          </NavigationContainer>
        </CartContextProvider>
      </FavoriteContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
