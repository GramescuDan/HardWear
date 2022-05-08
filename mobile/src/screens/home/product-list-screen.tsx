import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ProductItem } from "../../components/product-component";
import { SearchHeader } from "../../components/search-header";
import { px } from "../../hooks/utils";

export function ProductListScreen() {
    const [searchInput, setSearchInput] = useState<string>();
    const [searchedResults, setSearchedResults] = useState();

    const changeSearchInput = (val: string) => {
        setSearchInput(val);
    };
    useEffect(() => {
        // to add functionality for search
    }, [searchInput])
    return <ScrollView>
        <SearchHeader
            placeholderText="Search"
            inputValue={searchInput}
            onChangeText={changeSearchInput}
            setInputValue={setSearchInput}
            containerStyle={{ backgroundColor: '#fefefe', borderColor: 'gray', borderWidth: px(0.25), borderRadius: px(5), height: px(40), marginLeft: px(30), marginRight: px(30), marginTop: px(30) }}
            inputStyle={{ flexGrow: 3 }}
        />
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </View>
    </ScrollView>
}
