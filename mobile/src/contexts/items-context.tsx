import React, { createContext, ReactNode, useContext } from "react";
import { useAppNavigation } from "../hooks/utils";
import ItemsService from '../services/item';
import { Item } from "../screens/home/product-list-screen";
import { useAuthService } from "./auth-context";

export const ItemsContext = createContext<ReturnType<typeof useItems>>(null!);

export function useItemsContext() {
    const context = useContext(ItemsContext);
    return context();
}

function useItems() {
    const { loginInfo, setLoginInfo } = useAuthService();
    return function () {

        const getItems = async () => {
            const results: Item[] = await (await ItemsService.getAll()).data;
            return results;
        }

        const getItemsById = async (id: number) => {
            const result: Item = await (await ItemsService.getItemById(id)).data;
            return result;
        }

        // cart final checkout - to do
        const removeItemFromDb = async (id: number, item: Item) => {
            await ItemsService.putItemById(id)
        }

        const saveFavourite = async (userId: number, itemId: number) => {
            await ItemsService.saveFavourite(userId, itemId).then((res) => {
                setLoginInfo(res.data)
            });
        }

        const removeFavourite = async (userId: number, itemId: number) => {
            await ItemsService.removeFavourite(userId, itemId).then((res) => setLoginInfo(res.data));
        }

        const isFavorite = (itemParam: Item) => {
            return loginInfo?.favouriteItems.some(item => item.id === itemParam.id);
        }

        return {
            getItems,
            getItemsById,
            removeItemFromDb,
            saveFavourite,
            removeFavourite,
            isFavorite
        }
    }
}

export function ItemsContextProvider(p: { children?: ReactNode }) {
    const service = useItems();
    return <ItemsContext.Provider value={service}>
        {p.children}
    </ItemsContext.Provider>
}
