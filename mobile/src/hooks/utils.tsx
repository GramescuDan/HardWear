import { Dimensions } from "react-native";

export const {width, height} = Dimensions.get('window');

export function px(value: number) {
  const smallDimmension = Math.min(width, height);
  return value * smallDimmension / 400;
}