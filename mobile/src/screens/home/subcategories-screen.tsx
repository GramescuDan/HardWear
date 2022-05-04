import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { CategoryBox } from "../../components/category-box";
import { SearchHeader } from "../../components/search-header";
import { px } from "../../hooks/utils";
import { SubCategoryType } from "./home-screen";

type SubCategoryParams = {
    subCategory: SubCategoryType
}


export function SubCategory() {
    const route = useRoute();
    const params = route.params as SubCategoryParams;
    if (!params) return <></>;
    return <View style={{ flex: 1}}>
        <SearchHeader
            placeholderText="Search"
            containerStyle={{ backgroundColor: '#fefefe', borderColor: 'gray', borderWidth: px(0.25), borderRadius: px(5), height: px(40), marginLeft: px(30), marginRight: px(30), marginTop: px(30) }}
            inputStyle={{ flexGrow: 3 }}
        />
        <View style = {{flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly" }}>
        {params.subCategory.name.map((subcateg, index) => <CategoryBox key={subcateg} categoryName={subcateg} imageSource={params.subCategory.subCategoryImageSources[index]} />)}
        </View>
    </View>
}