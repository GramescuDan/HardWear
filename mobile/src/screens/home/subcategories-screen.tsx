import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageURISource, View } from "react-native";
import { CategoryBox } from "../../components/category-box";
import { SearchHeader } from "../../components/search-header";
import { px } from "../../hooks/utils";
import { categories, SubCategoryType } from "./home-screen";

type SubCategoryParams = {
    subCategory: SubCategoryType[]
}


export function SubCategory() {
    const route = useRoute();
    const params = route.params as SubCategoryParams;

    const [searchInput, setSearchInput] = useState<string>();
    const [searchedResults, setSearchedResults] = useState<SubCategoryType[]>();

    const changeSearchInput = (val: string) => {
        setSearchInput(val);
    };
    useEffect(() => {
        if (params) {
            const results = params.subCategory.filter(subCategory => subCategory.name.toLowerCase().includes(searchInput?.toLowerCase()!));
            setSearchedResults(results);
        }
    }, [searchInput])

    if (!params) return <></>;
    return <View style={{ flex: 1, backgroundColor: "#f3f9fe" }}>
        <SearchHeader
            placeholderText="Search"
            inputValue={searchInput}
            onChangeText={changeSearchInput}
            setInputValue={setSearchInput}
            containerStyle={{ backgroundColor: '#fefefe', borderColor: 'gray', borderWidth: px(0.25), borderRadius: px(5), height: px(40), marginLeft: px(30), marginRight: px(30), marginTop: px(30) }}
            inputStyle={{ flexGrow: 3 }}
        />
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly" }}>
            {(searchInput ? searchedResults : params.subCategory)?.map((subcateg, index) => <CategoryBox key={subcateg.name} subCategoryName = {subcateg.name} categoryName={subcateg.name} imageSource={subcateg.subCategoryImageSources} />)}
        </View>
    </View>
}