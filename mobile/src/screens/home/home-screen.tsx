import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, ImageURISource } from "react-native";
import { BottomNavBar } from "../../components/BottomNavigationBar";
import { CategoryBox } from "../../components/category-box";
import { SearchHeader } from "../../components/search-header";
import { px } from "../../hooks/utils";

export interface SubCategoryType {
    name: Array<string>;
    subCategoryImageSources: Array<ImageURISource>
}


export function HomeScreen() {

  const categories = [
    {
      categoryName: "Phones, Tablets",
      imageSource: require("../../../assets/phones-tablets.jpg"),
      subCategory: {
        name: ["Phones", "Tablets"],
        subCategoryImageSources: [
          require("../../../assets/phone.jpg"),
          require("../../../assets/tablet.jpg"),
        ]
      },
    },
    {
      categoryName: "Laptops, Desktop",
      imageSource: require("../../../assets/laptops-pc.jpg"),
      subCategory: {
        name: ["Laptops", "Desktop"],
        subCategoryImageSources: [
          require("../../../assets/laptop.jpg"),
          require("../../../assets/desktop.jpg"),
        ]
      },
    },
    {
      categoryName: "Gaming, Games",
      imageSource: require("../../../assets/gaming.jpg"),
      subCategory: {
        name: ["Keyboards", "Mouses", "Headphones", "Mousepad"],
        subCategoryImageSources: [
          require("../../../assets/keyboard.jpg"),
          require("../../../assets/mouse.png"),
          require("../../../assets/headphones.jpg"),
          require("../../../assets/mousepad.jpg"),
        ]
      },
    },
    {
      categoryName: "TV, Audio-Video, Photo",
      imageSource: require("../../../assets/tv.jpg"),
      subCategory: {
        name: ["TV", "Audio-Video", "Photo"],
        subCategoryImageSources: [
          require("../../../assets/tv.jpg"),
          require("../../../assets/speakers.jpg"),
          require("../../../assets/camera.png"),
        ]
      },
    },

  ]
  return (
    <View style={{ flex: 1 }}>
      <SearchHeader
        placeholderText="Search"
        containerStyle={{ backgroundColor: '#fefefe', borderColor: 'gray', borderWidth: px(0.25), borderRadius: px(5), height: px(40), marginLeft: px(30), marginRight: px(30), marginTop: px(30) }}
        inputStyle={{ flexGrow: 3 }}
      />
      <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly" }}>
        {categories.map(category => <CategoryBox key={category.categoryName} subCategory={category.subCategory} categoryName={category.categoryName} imageSource={category.imageSource} />)}
      </View>
    </View>
  );
}