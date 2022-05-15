import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useAuthService } from "../../contexts/auth-context";
import { px, useAppNavigation } from "../../hooks/utils";
import CheckBox from 'expo-checkbox';

export function AddressScreen() {
    const { loginInfo } = useAuthService();
    const [locationInput, setLocationInput] = useState<string>();
    const [billingAddress, setBillingAddress] = useState<string>();
    const [toggleCheckBox, setToggleCheckBox] = useState(true)
    const nav = useAppNavigation();

    const changeLocationInput = (val: string) => {
        setLocationInput(val);
    };

    const changeBillingAddress = (val: string) => {
        setBillingAddress(val);
    };
    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        <View style={{ flex: 1, margin: px(20) }}>
            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: px(24), margin: px(50) }}>ADDRESS</Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>Delivery</Text>
            <View style={[{ flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 50, borderRadius: 10 },]}>
                <Text>     </Text>
                <TextInput
                    onChangeText={changeLocationInput}
                    value={locationInput ?? loginInfo?.location}
                    style={[{ fontSize: px(16), color: 'lightgray', width: 500 },]}
                />
            </View>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    color="lightblue"
                />
                <Text style={{ marginLeft: 20 }}>Billing address same as delivery</Text>
            </View>
            {!toggleCheckBox &&
                <View style={[{ marginTop: 20, flexDirection: "row", alignItems: "center", backgroundColor: "white", height: 50, borderRadius: 10 },]}>
                    <Text>     </Text>
                    <TextInput
                        onChangeText={changeBillingAddress}
                        value={billingAddress ?? loginInfo?.location}
                        style={[{ fontSize: px(16), color: 'lightgray', width: 500 },]}
                    />
                </View>
            }
            <View style={{ flexGrow: 1 }} />
            <TouchableOpacity onPress={() => nav.navigate("Payment")} style={{ alignItems: "center", backgroundColor: "lightblue", padding: 20, borderRadius: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Payment </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: px(200) }}>{'>'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
}
