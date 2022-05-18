import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ProductItem } from "../../components/product-component";
import { SearchHeader } from "../../components/search-header";
import { useItemsContext } from "../../contexts/items-context";
import { px, useAppNavigation, useEffectAsync } from "../../hooks/utils";

export interface Item {
    id: number,
    thumbnail: string,
    description: string,
    name: string,
    price: number,
    quantity: number,
    categories: string[]
}

export function ProductListScreen() {
    const route = useRoute();
    const params = route.params as { categoryName: string };
    const [searchInput, setSearchInput] = useState<string>();
    const [searchedResults, setSearchedResults] = useState<Item[]>();
    const [itemsByCategory, setItemsByCategory] = useState<Item[]>();
    const { getItems } = useItemsContext();

    const changeSearchInput = (val: string) => {
        setSearchInput(val);
    };

    const nav = useAppNavigation();
    const goToSingleProducts = (id: number) => {
        nav.navigate("SingleProduct", { id });
    }

    useEffectAsync(async () => {
        try {
            const items = await getItems();
            const filteredItems = items.filter(item => item.categories.includes(params.categoryName));
            setItemsByCategory(filteredItems);
        }
        catch (e) {
            console.log(e);
        }
    }, [])


    useEffect(() => {
        const results = itemsByCategory?.filter(item => item.name.toLowerCase().includes(searchInput?.toLowerCase()!));
        setSearchedResults(results);
    }, [searchInput])

    return <ScrollView style={{ backgroundColor: "#f3f9fe" }}>
        <SearchHeader
            placeholderText="Search"
            inputValue={searchInput}
            onChangeText={changeSearchInput}
            setInputValue={setSearchInput}
            containerStyle={{ backgroundColor: '#fefefe', borderColor: 'gray', borderWidth: px(0.25), borderRadius: px(5), height: px(40), marginLeft: px(30), marginRight: px(30), marginTop: px(30) }}
            inputStyle={{ flexGrow: 3 }}
        />
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
            {(searchInput ? searchedResults : itemsByCategory)?.map(item => <TouchableOpacity key={item.id} onPress={() => goToSingleProducts(item.id)}>
                <ProductItem {...item} />
            </TouchableOpacity>)}
        </View>
    </ScrollView>
}
