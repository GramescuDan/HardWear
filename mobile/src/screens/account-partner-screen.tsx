import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text} from "react-native";
import { AccountDetails } from "../components/account-details";
import { BottomNavBar } from "../components/BottomNavigationBar";



export function AccountPartnerScreen(){
    return(
        <AccountDetails
            image="something"
            name="ioana"
            surname="rijnita"
            email="ioanarijnita@gmail.com"
            password="******"
        ></AccountDetails>
    );
}