import React, { createContext, ReactNode, useContext, useState } from "react";
import { AsyncStorage } from "react-native";
import { Product } from "../components/product-component";


export const CartContext = createContext<ReturnType<typeof useCart>>(null!);

export function useCartService() {
    const context = useContext(CartContext);
    return context();
}

function useCart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addItemToCart = (product: Product) => {
        cartItems.push(product);
        setCartItems([...cartItems]);
        AsyncStorage.setItem("cart", JSON.stringify(cartItems))
    }

    const removeItemFromCart = (product: Product) => {
        const index = cartItems.indexOf(product);
        cartItems.splice(index, 1);
        setCartItems([...cartItems]);
        AsyncStorage.setItem("cart", JSON.stringify(cartItems));
    }

    const getItemsToCart = async () => {
        const cart = await AsyncStorage.getItem("cart");
        if (cart) {
            setCartItems(JSON.parse(cart!));
        }
    }

    const clearCart = async () => {
        await AsyncStorage.removeItem("cart");
        setCartItems([]);
    }

    return function () {

        return {
            cartItems,
            addItemToCart,
            getItemsToCart,
            clearCart,
            removeItemFromCart
        }
    }
}

export function CartContextProvider(p: { children?: ReactNode }) {
    const service = useCart();
    return <CartContext.Provider value={service}>
        {p.children}
    </CartContext.Provider>
}
