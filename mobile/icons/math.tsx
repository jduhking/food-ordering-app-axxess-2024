import { AntDesign } from '@expo/vector-icons';
import IconProps from './exports';

export function Plus({ size, color }: IconProps) {
    return <AntDesign name="plus" size={size} color={color} />;
  }

export function Subtract({ size, color }: IconProps) {
    return <AntDesign name="minus" size={size} color={color} />;
  }
