import React, { useEffect, useState } from "react";
import { View, ImageURISource } from "react-native";
import { CategoryBox } from "../../components/category-box";
import { SearchHeader } from "../../components/search-header";
import { px } from "../../hooks/utils";

export interface SubCategoryType {
  name: string;
  subCategoryImageSources: ImageURISource
}

export const categories = [
  {
    categoryName: "Phones, Tablets",
    imageSource: require("../../../assets/phones-tablets.jpg"),
    subCategory: [{
      name: "Mobile Phones",
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
        name: "Monitors & Peripheries",
        subCategoryImageSources: require("../../../assets/desktop.jpg")
      },
      {
        name: "Software & Office Supplies",
        subCategoryImageSources: require("../../../assets/office.jpg")
      }]
  },
  {
    categoryName: "Gaming, Games",
    imageSource: require("../../../assets/gaming.jpg"),
    subCategory: [
      {
        name: "Gaming & Office Systems",
        subCategoryImageSources: require("../../../assets/office_systems.jpg")
      },
      {
        name: "Gaming",
        subCategoryImageSources: require("../../../assets/gaming2.jpg")
      },
      {
        name: "Components",
        subCategoryImageSources: require("../../../assets/keyboard.jpg")
      }
    ]
  },

  {
    categoryName: "TV, Audio-Video, Networking",
    imageSource: require("../../../assets/tv.jpg"),
    subCategory: [
      {
        name: "TV & Video",
        subCategoryImageSources: require("../../../assets/tv.jpg")
      },
      {
        name: "Networking & UPS",
        subCategoryImageSources: require("../../../assets/networking.jpg")
      }
      ]
  },
]

export function HomeScreen() {
  const [searchedResults, setSearchedResults] = useState<typeof categories>();
  const [searchInput, setSearchInput] = useState<string>();
  const changeSearchInput = (val: string) => {
    setSearchInput(val);
  };

  useEffect(() => {
    const results = categories.filter(category => category.categoryName.toLowerCase().includes(searchInput?.toLowerCase()!));
    setSearchedResults(results);
  }, [searchInput])

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f9fe" }}>
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
