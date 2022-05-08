import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ImageURISource } from "react-native";
import { BottomNavBar } from "../../components/BottomNavigationBar";
import { CategoryBox } from "../../components/category-box";
import { SearchHeader } from "../../components/search-header";
import { px, useEffectAsync } from "../../hooks/utils";
import ItemsService from '../../services/item';

export interface SubCategoryType {
  name: string;
  subCategoryImageSources: ImageURISource
}

export const categories = [
  {
    categoryName: "Phones, Tablets",
    imageSource: require("../../../assets/phones-tablets.jpg"),
    subCategory: [{
      name: "Phones",
      subCategoryImageSources: require("../../../assets/phone.jpg")
    },
    {
      name: "Tablets",
      subCategoryImageSources: require("../../../assets/tablet.jpg")
    }]
  },
  {
    categoryName: "Laptops, Desktop",
    imageSource: require("../../../assets/laptops-pc.jpg"),
    subCategory: [
      {
        name: "Laptops",
        subCategoryImageSources: require("../../../assets/laptop.jpg")
      },
      {
        name: "Desktop",
        subCategoryImageSources: require("../../../assets/desktop.jpg")
      }]
  },
  {
    categoryName: "Gaming, Games",
    imageSource: require("../../../assets/gaming.jpg"),
    subCategory: [
      {
        name: "Keyboards",
        subCategoryImageSources: require("../../../assets/keyboard.jpg")
      },
      {
        name: "Mouses",
        subCategoryImageSources: require("../../../assets/mouse.png")
      },
      {
        name: "Headphones",
        subCategoryImageSources: require("../../../assets/headphones.jpg")
      },
      {
        name: "Mousepad",
        subCategoryImageSources: require("../../../assets/mousepad.jpg")
      }]
  },
  {
    categoryName: "TV, Audio-Video, Photo",
    imageSource: require("../../../assets/tv.jpg"),
    subCategory: [
      {
        name: "TV",
        subCategoryImageSources: require("../../../assets/tv.jpg")
      },
      {
        name: "Audio-Video",
        subCategoryImageSources: require("../../../assets/speakers.jpg")
      },
      {
        name: "Photo",
        subCategoryImageSources: require("../../../assets/camera.png")
      }]
  },
]


export function HomeScreen() {
  const [searchedResults, setSearchedResults] = useState<typeof categories>();
  const [searchInput, setSearchInput] = useState<string>();
  const [categoriesState, setCategoriesState] = useState([]);

  const changeSearchInput = (val: string) => {
    setSearchInput(val);
  };

  useEffect(() => {
    const results = categories.filter(category => category.categoryName.toLowerCase().includes(searchInput?.toLowerCase()!));
    setSearchedResults(results);
  }, [searchInput])

  useEffectAsync(async () => {
    try {
      const results = await (await ItemsService.getAll()).data;
      setCategoriesState(results);
    }
    catch (e) {
      console.log(e);
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <SearchHeader
        placeholderText="Search"
        inputValue={searchInput}
        onChangeText={changeSearchInput}
        setInputValue={setSearchInput}
        containerStyle={{ backgroundColor: '#fefefe', borderColor: 'gray', borderWidth: px(0.25), borderRadius: px(5), height: px(40), marginLeft: px(30), marginRight: px(30), marginTop: px(30) }}
        inputStyle={{ flexGrow: 3 }}
      />
      <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly" }}>
        {(searchInput ? searchedResults : categories)?.map(category => <CategoryBox key={category.categoryName} subCategory={category.subCategory} categoryName={category.categoryName} imageSource={category.imageSource} />)}
      </View>
    </View>
  );
}