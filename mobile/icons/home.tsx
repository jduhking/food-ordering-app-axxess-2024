import { Ionicons } from "@expo/vector-icons";
import IconProps from "./exports";

export function HomeIcon({ size, color }: IconProps) {
  return <Ionicons name="home" size={size} color={color} />;
}

export function HomeOutlineIcon({ size, color }: IconProps) {
  return <Ionicons name="home-outline" size={size} color={color} />;
}