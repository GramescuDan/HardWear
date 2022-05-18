import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAppNavigation } from "../hooks/utils";
import { User } from "../models/user";
import { EditableInputs } from "../screens/account/my-profile";
import { LoginInfo } from "../screens/login-screen";
import { RegInfo } from "../screens/registration-screen";
import UserService from '../services/user';
import ItemsService from '../services/item';
import { Item } from "../screens/home/product-list-screen";


export const ItemsContext = createContext<ReturnType<typeof useItems>>(null!);

export function useItemsContext() {
    const context = useContext(ItemsContext);
    return context();
}

function useItems() {
    const nav = useAppNavigation();
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
        const removeItemFromDb = async (id: number) => {
            await ItemsService.putItemById(id)
        }

        return {
            getItems,
            getItemsById
        }
    }
}

export function ItemsContextProvider(p: { children?: ReactNode }) {
    const service = useItems();
    return <ItemsContext.Provider value={service}>
        {p.children}
    </ItemsContext.Provider>
}
