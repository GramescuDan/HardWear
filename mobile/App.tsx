import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { StackNavComponent } from './src/components/StackNavigation';
import { CartContextProvider } from './src/contexts/cart-context';
import { FavoriteContextProvider } from './src/contexts/favorites-context';
import { AuthContextProvider } from './src/contexts/auth-context';
import { ItemsContextProvider } from './src/contexts/items-context';

export default function App() {
  // useFonts({
  //   'JetBrainsMono': require('./assets/fonts/ttf/JetBrainsMono-Regular.ttf'),
  //   'Open-Sans': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  //   'Open-Sans-Bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
  // });

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <FavoriteContextProvider>
        <CartContextProvider>
          <NavigationContainer>
            <ItemsContextProvider>
              <AuthContextProvider>
                <StackNavComponent></StackNavComponent>
              </AuthContextProvider>
            </ItemsContextProvider>
          </NavigationContainer>
        </CartContextProvider>
      </FavoriteContextProvider>
    </SafeAreaView>
  );
}
