import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { px, useAppNavigation } from '../../hooks/utils';

export function MyProfilePage() {
    const nav = useAppNavigation();
    const saveProfile = () => {
      nav.navigate("Home");

    };

    return <View style={{ flex: 1 }}>
        <ScrollView style={{ margin: 15 }} horizontal={false} showsVerticalScrollIndicator={false} >
            <Text style={{ fontSize: 32 }}>Account details</Text>

            <View style={{ flex: 1, flexDirection: "row" }}>
                <View>
                    <Text style={[{ fontSize: px(15), lineHeight: px(20), marginTop: px(10), marginBottom: px(5), color: "gray" }]}>First name</Text>
                    <Text style={{ fontSize: 18 }}>Ioana</Text>

                    <Text style={[{ fontSize: px(15), lineHeight: px(20), marginTop: px(10), marginBottom: px(5), color: "gray" }]}>Last name</Text>
                    <Text style={{ fontSize: 18 }}>Rijnita</Text>

                    <Text style={[{ fontSize: px(15), lineHeight: px(20), marginTop: px(10), marginBottom: px(5), color: "gray" }]}>Email</Text>
                    <Text style={{ fontSize: 18 }}>ioanarijnita@gmail.com</Text>
                </View>
                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Text>Poza</Text>
                </View>
            </View>

            <View style={{ flexGrow: 1 }}></View>
        </ScrollView>
        <TouchableOpacity onPress={saveProfile} style={{ backgroundColor: "lightblue", padding: 10, borderRadius: px(8), marginLeft: px(20), marginRight: px(20) }}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>SAVE</Text>
        </TouchableOpacity>
    </View>
}
