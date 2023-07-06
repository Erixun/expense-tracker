import { ReactNode } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ButtonProps } from 'react-native';

export const Button = ({ children, onPress, mode }: ButtonProps & {children: ReactNode, mode: string}) => {
  return (
    <TouchableOpacity onPress={onPress} style={$button}>
      <Text style={$text}>{children}</Text>
    </TouchableOpacity>
  );
};

const $button: ViewStyle = {};

const $text: TextStyle = {};
