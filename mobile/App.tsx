import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { RegistrationScreen } from './src/pages/registration-page';
import { useFonts } from 'expo-font';


function useAppNavigation() {
  const nav = useNavigation();

  const navigate = (screen: string) => {
    // @ts-ignore
    nav.navigate(screen);
  }
  return {
    navigate
  };
}
function HomeScreen() {
  const nav = useAppNavigation();
  const goToRegister = () => {
    nav.navigate("Registration");
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app bjhfvjabdvjab!</Text>
      <StatusBar style="auto" />
      <Button title="go to register" onPress={goToRegister}></Button>
    </View>
  );
}
export default function App() {
  const Stack = createNativeStackNavigator();
  let [fontsLoaded] = useFonts({
    'JetBrainsMono': require('./assets/fonts/ttf/JetBrainsMono-Regular.ttf'),
    'Open-Sans': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'Open-Sans-Bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
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
