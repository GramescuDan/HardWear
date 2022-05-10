import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./home-screen";
import { ProductListScreen } from "./product-list-screen";
import { SingleProductScreen } from "./single-product-screen";
import { SubCategory } from "./subcategories-screen";

export function HomeNavigator() {
    const Stack = createNativeStackNavigator();

    return <Stack.Navigator screenOptions = {{headerTitle: "" }}  >
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#f3f9fe" } }} name="Category"  component={HomeScreen} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#f3f9fe" } }} name="SubCategory" component={SubCategory} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#f3f9fe" } }} name="ProductList" component={ProductListScreen} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#f3f9fe" } }} name="SingleProduct" component={SingleProductScreen} />
    </Stack.Navigator>
}