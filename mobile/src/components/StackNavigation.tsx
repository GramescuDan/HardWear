
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { LoginScreen } from '../screens/login-screen';
import { MainScreen } from '../screens/main-screen';
import { RegistrationScreen } from '../screens/registration-screen';
import { BottomNavBar } from './BottomNavigationBar';

export function StackNavComponent() {
    const Stack = createNativeStackNavigator();

    return (
        
        <Stack.Navigator screenOptions = {{headerTitle: ""}} initialRouteName = "Main" >
            <Stack.Screen options={{ headerStyle: { backgroundColor: "#c6c6c6" } }} name="Main" component={MainScreen} />
            <Stack.Screen options={{ headerStyle: { backgroundColor: "#c6c6c6" } }} name="Registration" component={RegistrationScreen} />
            <Stack.Screen options={{ headerStyle: { backgroundColor: "#c6c6c6" } }} name="Login" component={LoginScreen} />
            <Stack.Screen options = {{headerStyle: { backgroundColor: "#c6c6c6" }, headerShown: false}} name = "Products" component = {BottomNavBar} />
        </Stack.Navigator>
        
    );
}
