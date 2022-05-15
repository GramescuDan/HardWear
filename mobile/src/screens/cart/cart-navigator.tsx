import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddressScreen } from "./address";
import { CartScreen } from "./cart-screen";
import { CartPayment } from "./payment";
import { PlacedOrderInfo } from "./placed-order-info";

export function CartNavigator() {
    const Stack = createNativeStackNavigator();

    return <Stack.Navigator screenOptions={{ headerTitle: "" }} initialRouteName="CartNavigator" >
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#f3f9fe" } }} name="CartScreen" component={CartScreen} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#f3f9fe" } }} name="Address" component={AddressScreen} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#f3f9fe" } }} name="Payment" component={CartPayment} />
        <Stack.Screen options={{ headerStyle: { backgroundColor: "#f3f9fe" } }} name="PlacedOrderInfo" component={PlacedOrderInfo} />
    </Stack.Navigator>
}
