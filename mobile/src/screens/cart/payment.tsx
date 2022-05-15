import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { px, useAppNavigation } from "../../hooks/utils";
import CheckBox from 'expo-checkbox';

export function CartPayment() {
    const [cardInput, setCardInput] = useState<string>();
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const nav = useAppNavigation();

    const changeCartInput = (val: string) => {
        setCardInput(val);
    };

    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        <View style={{ flex: 1, margin: px(20) }}>
            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: px(24), margin: px(50) }}>PAYMENT</Text>
            <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    color="lightblue"
                />
                <Text style={{ marginLeft: 20 }}>Use card</Text>
            </View>
            {toggleCheckBox ? <>
                <Text style={{ fontSize: 16, marginBottom: 20 }}>Card number</Text>
                <View style={[{ flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 50, borderRadius: 10 },]}>
                    <Text>     </Text>
                    <TextInput
                        onChangeText={changeCartInput}
                        value={cardInput}
                        style={[{ fontSize: px(16), color: 'lightgray', width: 500 },]}
                    />
                </View>
            </>
                : <Text style={{ fontSize: 16, marginBottom: 20 }}>Repayment</Text>
            }
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: px(40) }}>
                <Text style={{ fontSize: 24, color: "black" }}>Total</Text>
                <Text style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>0$</Text>
            </View>
            <View style={{ flexGrow: 1 }} />
            <TouchableOpacity onPress={() => nav.navigate("PlacedOrderInfo")} style={{ alignItems: "center", backgroundColor: "lightblue", padding: 20, borderRadius: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Place order</Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: px(200) }}>{'>'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
}
