import { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ButtonProps,
} from 'react-native';
import App from '../App';
import { palette } from '../theme/colors';

export const Button = ({
  children,
  onPress,
  mode,
  size,
  type,
}: Omit<ButtonProps, 'title'> & {
  children: ReactNode;
  mode: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'primary' | 'secondary' | 'neutral';
}) => {
  const $buttonStyle: ViewStyle = {
    ...$button,
    backgroundColor:
      type === 'primary'
        ? palette.primary.dark
        : 'secondary'
        ? palette.secondary.dark
        : palette.neutral.dark,
  };
  const $textStyle: TextStyle = {
    ...$text,
    fontSize: size === 'lg' ? 32 : size === 'md' ? 24 : 16,
  };
  return (
    <TouchableOpacity onPress={onPress} style={$buttonStyle}>
      <Text style={$textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const $button: ViewStyle = {
  // backgroundColor: palette.primary.dark,
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 8,
  marginTop: 16,
};

const $text: TextStyle = {
  textAlign: 'center',
  color: 'white',
};
