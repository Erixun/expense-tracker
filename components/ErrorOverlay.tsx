import { View, Text, TextStyle, ViewStyle } from 'react-native';
import { Button } from './Button';

type ErrorOverlayProps = {
  message: string;
  onConfirm: () => void;
};
export const ErrorOverlay = ({ message, onConfirm }: ErrorOverlayProps) => {
  return (
    <View style={$container}>
      <Text style={[$text, $title]}>An error occured!</Text>
      <Text style={[$text, $message]}>App says: "{message}"</Text>
      <Button mode='' onPress={onConfirm} type='neutral'>Close</Button>
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
  backgroundColor: 'rgba(0,0,0,0.5)',
};

const $title: TextStyle = {
  fontSize: 32,
  fontWeight: 'bold',
  marginBottom: 16,
};

const $message: TextStyle = {
  fontSize: 16,
};

const $text: TextStyle = {
  textAlign: 'center',
  color: 'white',
};

const $button: ViewStyle = {
  backgroundColor: 'white',
  padding: 16,
  borderRadius: 8,
  marginTop: 16,
};
