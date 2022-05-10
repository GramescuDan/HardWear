import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Touchable } from 'react-native';
import { useAuthService } from '../../contexts/auth-context';
import { px, useAppNavigation } from '../../hooks/utils';
import { AntDesign } from '@expo/vector-icons';
import { User } from '../../models/user';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export type EditableInputs<T> = {
    id?: number;
    firstName: T;
    lastName: T;
    email: T;
    phone: T;
    location: T;
}

type EditableInputProps = {
    onPress: () => void;
    focusedInput: boolean;
    inputValue: string;
    onChangeText: (val: string) => void;
    inputName: string;
    icon: JSX.Element;
}


function EditableInput(p: EditableInputProps) {
    let ref: React.RefObject<TextInput> | null = null;
    const firstNameRef = useRef<TextInput>(null);
    const lastNameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const locationRef = useRef<TextInput>(null);

    switch (p.inputName) {
        case "First name":
            ref = firstNameRef;
            break;
        case "Last name":
            ref = lastNameRef;
            break;
        case "Email":
            ref = emailRef;
            break;
        case "Phone":
            ref = phoneRef;
            break;
        case "location":
            ref = locationRef;
            break;
        default:
            ref = ref;
            break;
    }


    useEffect(() => {
        if (p.focusedInput) {
            ref?.current?.focus();
        }
    }, [p.focusedInput])

    return <TouchableOpacity
        onPress={p.onPress}
        style={{ flexDirection: "row", marginTop: px(30) }}
    >
        {p.focusedInput && <TextInput value={p.inputValue} onChangeText={p.onChangeText} ref={ref} style={{ fontSize: 18, fontWeight: "bold", color: "black" }}></TextInput>}
        {!p.focusedInput && <View style={{ flex: 1, flexDirection: "row", borderWidth: 1, borderStyle: "solid", borderColor: "lightgray", borderRadius: px(10), padding: px(10) }}>
            {p.icon}
            <Text style={{ fontWeight: "bold", fontSize: px(18), color: "gray", marginLeft: px(10) }}>{p.inputName}:  {p.inputValue}</Text>
            <AntDesign name="right" size={24} color="gray" style={{ position: "absolute", alignSelf: "center", right: px(30) }} />
        </View>}
    </TouchableOpacity>
}

export function MyProfilePage() {
    const nav = useAppNavigation();
    const { loginInfo, editProfile, doLogout } = useAuthService();
    
    const [focusedInputs, setFocusedInputs] = useState<EditableInputs<boolean>>();
    const [fields, setFields] = useState<User>(loginInfo!);

    const onChangeFirstName = (val: string) => {
        setFields({ ...fields!, firstName: val });
    }
    const onChangeLastName = (val: string) => {
        setFields({ ...fields!, lastName: val });
    }
    const onChangeEmail = (val: string) => {
        setFields({ ...fields!, email: val });
    }
    const onChangePhone = (val: string) => {
        setFields({ ...fields!, phone: val });
    }
    const onChangelocation = (val: string) => {
        setFields({ ...fields!, location: val });
    }

    return <View style={{ flex: 1, backgroundColor: "#f3f9fe" }}>
        <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity>
                <MaterialCommunityIcons name="account" size={75} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: px(24), fontWeight: "bold" }}>{loginInfo?.username}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {
            setFocusedInputs({ firstName: false, location: false, lastName: false, email: false, phone: false });
        }} >
            <View style={{ flexGrow: 0.5, backgroundColor: "white", borderTopEndRadius: 50, borderTopLeftRadius: 50 }}>

                <View style={{ margin: px(20) }}>
                    <EditableInput
                        focusedInput={focusedInputs?.firstName!}
                        inputValue={fields?.firstName! ?? loginInfo?.firstName}
                        onChangeText={onChangeFirstName}
                        onPress={() => setFocusedInputs({ ...focusedInputs!, firstName: !focusedInputs?.firstName! })}
                        inputName="First name"
                        icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="gray" />}
                    />
                    <EditableInput
                        focusedInput={focusedInputs?.lastName!}
                        inputValue={fields?.lastName! ?? loginInfo?.lastName}
                        onChangeText={onChangeLastName}
                        onPress={() => setFocusedInputs({ ...focusedInputs!, lastName: !focusedInputs?.lastName! })}
                        inputName="Last name"
                        icon={<MaterialIcons name="drive-file-rename-outline" size={24} color="gray" />}
                    />
                    <EditableInput
                        focusedInput={focusedInputs?.email!}
                        inputValue={fields?.email! ?? loginInfo?.email}
                        onChangeText={onChangeEmail}
                        onPress={() => setFocusedInputs({ ...focusedInputs!, email: !focusedInputs?.email! })}
                        inputName="Email"
                        icon={<Entypo name="mail" size={24} color="gray" />}
                    />
                    <EditableInput
                        focusedInput={focusedInputs?.phone!}
                        inputValue={fields?.phone! ?? loginInfo?.phone}
                        onChangeText={onChangePhone}
                        onPress={() => setFocusedInputs({ ...focusedInputs!, phone: !focusedInputs?.phone! })}
                        inputName="Phone"
                        icon={<Entypo name="phone" size={24} color="gray" />}
                    />
                    <EditableInput
                        focusedInput={focusedInputs?.location!}
                        inputValue={fields?.location! ?? loginInfo?.location}
                        onChangeText={onChangelocation}
                        onPress={() => setFocusedInputs({ ...focusedInputs!, location: !focusedInputs?.location! })}
                        inputName="location"
                        icon={<Entypo name="calendar" size={24} color="gray" />}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, flexGrow: 0.8, flexDirection: "row", backgroundColor: "white", justifyContent: "space-around", alignItems: "center", paddingBottom: 20 }}>
            <TouchableOpacity onPress={() => editProfile(fields!)} style={{ backgroundColor: "#f3f9fe", borderRadius: px(8), padding: px(20), }}>
                <Feather name="save" size={24} color="black" style={{ alignSelf: "center" }} />
                <Text style={{ fontWeight: "bold", textAlign: "center", alignSelf: "center" }}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={doLogout} style={{ backgroundColor: "#f3f9fe", padding: px(20), borderRadius: px(8) }}>
                <AntDesign name="logout" size={24} color="black" style = {{alignSelf: "center"}}/>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>LOG OUT</Text>
            </TouchableOpacity>
        </View>
    </View>
}
