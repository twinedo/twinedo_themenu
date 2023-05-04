import {ReactNode} from 'react';
import {StyleProp, ViewStyle, TextInputProps} from 'react-native';

export interface IInputProps extends TextInputProps {
  prefix?: ReactNode;
  postfix?: ReactNode;
  containerStyle?: StyleProp<ViewStyle> | undefined;
}

export interface IMenuItems {
  food_code?: string;
  name?: string;
  picture: string;
  price?: string;
  picture_ori?: string;
  created_at?: string;
  id?: number;
}
