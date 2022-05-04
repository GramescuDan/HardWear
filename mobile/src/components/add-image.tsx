import React, { useState } from "react";
import { View, Image, Text, ViewStyle, TouchableOpacity, Platform } from "react-native";
import Feather from "@expo/vector-icons/build/Feather";
import { px } from "../hooks/utils";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from 'react-native-image-crop-picker';
import { useMessageBox } from "../screens/modals/message-modal";

type imageURI = {
    localImageUri: string;
    base64Image: string;
}

const selectImage = async (multiple: boolean, imageURI: imageURI[], setImageURI: React.Dispatch<React.SetStateAction<imageURI[]>>) => {
    // const androidPermission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    // const iOSPermission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    // const photosPermission = Platform.OS === "android" ? androidPermission : iOSPermission;
    const { showMessage } = useMessageBox();

    const loadImages = async (imgPath: string) => {
        const manipResult = await manipulateAsync(
            imgPath,
            [
                { rotate: 0 }
            ],
            { compress: Platform.OS === "android" ? 1 : 0.8, format: SaveFormat.JPEG, base64: true }
        );
        imageURI.push({
            localImageUri: manipResult.uri,
            base64Image: manipResult.base64!
        });
        const filteredImageArray = imageURI.filter(item => item.localImageUri !== "");
        setImageURI([...filteredImageArray]);
    }
    try {
        // await request(photosPermission);
        // check(photosPermission).then(async (result) => {
        //     if (result === "granted" || result === "limited") {
                ImagePicker.openPicker({
                    multiple: multiple,
                    mediaType: "photo",
                }).then(async (images) => {
                    if (images !== undefined || images !== []) {
                        if (Array.isArray(images)) {
                            for (const img of images) {
                                await loadImages(img.path);
                            }
                        }
                        else {
                            await loadImages(images.path);
                            if (imageURI.length === 2) {
                                imageURI.shift();
                            }
                            setImageURI([...imageURI]);
                        }
                    }
                });
    } catch (e) {
        console.log("Error selecting image: ", e)
    }
}

export function AddImage(p: { condition: boolean, wrapperStyle: ViewStyle}) {
    const [imageURI, setImageURI] = useState<imageURI[]>([{
        localImageUri: '',
        base64Image: ''
    }])
    return <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }, p.wrapperStyle]}>
        {p.condition ? <TouchableOpacity onPress={() => {
            try {
                selectImage(false, imageURI, setImageURI);
            } catch (e) {
                console.log(e)
            }
        }} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#D3E5FF', width: px(141), height: px(141), borderRadius: px(22), marginBottom: px(10) }}>
            <Text style={{ fontSize: px(67), color: "darkblue" }}>+</Text>
        </TouchableOpacity> :
            <View style={{ marginBottom: px(10) }}>
                <TouchableOpacity onPress={() => setImageURI([{ base64Image: "", localImageUri: "" }])} style={[{position: "absolute", zIndex: 1, top: px(5), right: px(5), padding: px(4) }]}>
                    <Feather name="x" size={px(20)} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: imageURI[0].localImageUri }} style={[{width: 141, height: 141, borderRadius: px(22) }]} />
            </View>
        }
    </View>
}