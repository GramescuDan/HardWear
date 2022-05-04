import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { AccountClientScreen } from '../screens/account-client-screen';
import { MyProfilePage } from '../screens/account/my-profile';
import { MainScreen } from '../screens/main-screen';
import { HomeScreen } from '../screens/home/home-screen';
import { RegistrationScreen } from '../screens/registration-screen';
import { CartScreen } from '../screens/cart/cart-screen';
import { HomeNavigator } from '../screens/home/home-navigator';
import { FavoriteScreen } from '../screens/favorites/favourite-screen';

const Tab = createMaterialBottomTabNavigator();

// function testStack() {
//     const Stack = createNativeStackNavigator();

//     return <Stack.Navigator>
//         <Stack.Screen name = "x" component = {<></>} />
//         <Stack.Screen name = "x" component = {<></>} />

//     </Stack.Navigator>
// }

export function BottomNavBar() {

    return (

        <Tab.Navigator inactiveColor="green" activeColor="darkred" initialRouteName="Home"
            screenOptions={{
                tabBarColor: "white",
            } }
        >
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Favourites" component={FavoriteScreen} />
            <Tab.Screen name="Account" component={MyProfilePage} />

        </Tab.Navigator>

    );
}
