import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ProductItem } from "../../components/product-component";
import { SearchHeader } from "../../components/search-header";
import { px, useAppNavigation } from "../../hooks/utils";

export function ProductListScreen() {
    const [searchInput, setSearchInput] = useState<string>();
    const [searchedResults, setSearchedResults] = useState();

    const changeSearchInput = (val: string) => {
        setSearchInput(val);
    };

    const nav = useAppNavigation();
    const goToSingleProducts = () => {
        nav.navigate("SingleProduct");
    }
    
    
    useEffect(() => {
        // to add functionality for search
    }, [searchInput])
    return <ScrollView style = {{backgroundColor: "#f3f9fe"}}>
        <SearchHeader
            placeholderText="Search"
            inputValue={searchInput}
            onChangeText={changeSearchInput}
            setInputValue={setSearchInput}
            containerStyle={{ backgroundColor: '#fefefe', borderColor: 'gray', borderWidth: px(0.25), borderRadius: px(5), height: px(40), marginLeft: px(30), marginRight: px(30), marginTop: px(30) }}
            inputStyle={{ flexGrow: 3 }}
        />
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
            <TouchableOpacity onPress = {goToSingleProducts}>
            <ProductItem />
            </TouchableOpacity>
            <TouchableOpacity>
            <ProductItem />
            </TouchableOpacity>
            <TouchableOpacity>
            <ProductItem />
            </TouchableOpacity>
            <TouchableOpacity>
            <ProductItem />
            </TouchableOpacity>
            
        </View>
    </ScrollView>
}
