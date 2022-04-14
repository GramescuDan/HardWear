import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RegistrationScreen } from './src/screens/registration-screen';
import { useFonts } from 'expo-font';
import { LoginScreen } from './src/screens/login-screen';
import { MainScreen } from './src/screens/main-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';


export function useAppNavigation() {
  const nav = useNavigation();

  const navigate = (screen: string) => {
    // @ts-ignore
    nav.navigate(screen);
  }
  return {
    navigate
  };
}
 
export default function App() {
  const Stack = createNativeStackNavigator();
  useFonts({
    'JetBrainsMono': require('./assets/fonts/ttf/JetBrainsMono-Regular.ttf'),
    'Open-Sans': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'Open-Sans-Bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
  });

  return (
    <SafeAreaView style = {{backgroundColor: "black",  flex: 1}}>
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen  options = {{ headerStyle: {backgroundColor: "#c6c6c6"} }}  name="Main" component={MainScreen} />
        <Stack.Screen  options = {{ headerStyle: {backgroundColor: "#c6c6c6"} }} name="Registration" component={RegistrationScreen} />
        <Stack.Screen  options = {{ headerStyle: {backgroundColor: "#c6c6c6"} }} name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
