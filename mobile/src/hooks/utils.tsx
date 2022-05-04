import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

export const {width, height} = Dimensions.get('window');

export function px(value: number) {
  const smallDimmension = Math.min(width, height);
  return value * smallDimmension / 400;
}

export function useAppNavigation() {
  const nav = useNavigation();

  const navigate = (screen: string, params?: object) => {
    // @ts-ignore
    nav.navigate(screen, params);
  }
  return {
    navigate
  };
}