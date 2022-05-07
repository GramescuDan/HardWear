import React, { useEffect, useState } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { px } from "../hooks/utils";

interface Search {
    placeholderText: string,
    containerStyle: StyleProp<ViewStyle>,
    inputStyle: StyleProp<TextStyle>,
    inputValue: string | undefined,
    setInputValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    onChangeText: (val: string) => void,
}

export function SearchHeader(p: Search) {

    const width = Dimensions.get('window').width;
    return <View style={[{flexDirection: "row", alignItems: "center"}, p.containerStyle]}>
        <Text>  🔍 </Text>
        <TextInput
            placeholder={p.placeholderText}
            placeholderTextColor='#a4a3b1'
            onChangeText={p.onChangeText}
            value={p.inputValue}
            style={[{ fontSize: px(13), color: '#a4a3b1', width: width / 3.5 }, p.inputStyle]}
        />
        <TouchableOpacity onPress={() => {
            p.setInputValue('');
        }}>
            <Text style={{ alignSelf: 'flex-start', padding: px(3) }}>   ⨂    </Text>
        </TouchableOpacity>
    </View>
}
