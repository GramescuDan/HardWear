import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text} from "react-native";
import { BottomNavBar } from "../components/BottomNavigationBar";
import { SingleProductScreen } from "./single-product-screen";



export function FavouriteScreen(){
    return(

        <View >
        <Text>
          Favourites here
        </Text>   
        </View>
    );
}