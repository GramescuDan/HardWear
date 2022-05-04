import React, { useState } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { px } from "../hooks/utils";

interface Search {
    placeholderText: string,
    containerStyle: StyleProp<ViewStyle>,
    inputStyle: StyleProp<TextStyle>
}

export function SearchHeader(p: Search) {
    const [searchInput, setSearchInput] = useState<string>();

    const changeSearchInput = (val: string) => {
      setSearchInput(val);
    };
    const width = Dimensions.get('window').width;
    return <View style={[{flexDirection: "row", alignItems: "center"}, p.containerStyle]}>
        <Text>  🔍 </Text>
        <TextInput
            placeholder={p.placeholderText}
            placeholderTextColor='#a4a3b1'
            onChangeText={changeSearchInput}
            value={searchInput}
            style={[{ fontSize: px(13), color: '#a4a3b1', width: width / 3.5 }, p.inputStyle]}
        />
        <TouchableOpacity onPress={() => {
            setSearchInput('');
        }}>
            <Text style={{ alignSelf: 'flex-start', padding: px(3) }}>   ⨂    </Text>
        </TouchableOpacity>
    </View>
}
