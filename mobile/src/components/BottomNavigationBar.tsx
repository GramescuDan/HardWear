import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { AccountClientScreen } from '../screens/account-client-screen';
import { MyProfilePage } from '../screens/account/my-profile';
import { MainScreen } from '../screens/main-screen';
import { RegistrationScreen } from '../screens/registration-screen';
import { CartScreen } from '../screens/cart/cart-screen';
import { HomeNavigator } from '../screens/home/home-navigator';
import { FavoriteScreen } from '../screens/favorites/favourite-screen';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export function BottomNavBar() {

    return (

        <Tab.Navigator initialRouteName = "Home"
            screenOptions={{
                tabBarActiveBackgroundColor: "white",
                tabBarInactiveBackgroundColor: "white",
                tabBarActiveTintColor: "darkblue",
                headerTitle: "",
                headerShown: false
            }}
        >
            <Tab.Screen name="Home" component={HomeNavigator} options={{
                tabBarIcon: ({ color, focused }) => (
                    <Entypo name="home" size={24} color={focused ? "darkblue" : "grey"} />
                ),
            }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{
                tabBarIcon: ({ color, focused }) => (
                    <Entypo name="shopping-cart" size={24} color={focused ? "darkblue" : "grey"} />
                ),
            }} />
            <Tab.Screen name="Favourites" component={FavoriteScreen} options={{
                tabBarIcon: ({ color, focused }) => (
                    <AntDesign name="heart" size={24} color={focused ? "darkblue" : "grey"} />
                ),
            }} />
            <Tab.Screen name="Account" component={MyProfilePage} options={{
                tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name="account" size={24} color={focused ? "darkblue" : "grey"} />
                ),
            }} />

        </Tab.Navigator>

    );
}
