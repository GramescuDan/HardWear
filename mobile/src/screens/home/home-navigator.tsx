import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./home-screen";
import { ProductListScreen } from "./product-list-screen";
import { SubCategory } from "./subcategories-screen";

export function HomeNavigator() {
    const Stack = createNativeStackNavigator();

    return <Stack.Navigator screenOptions = {{headerTitle: "" }}  >
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#c6c6c6" } }} name="Category"  component={HomeScreen} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#c6c6c6" } }} name="SubCategory" component={SubCategory} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#c6c6c6" } }} name="ProductList" component={ProductListScreen} />
    </Stack.Navigator>
}