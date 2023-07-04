import { TextStyle, ViewStyle } from 'react-native';
import { View, Text, TextInput, TextInputProps } from 'react-native';

type InputProps = {
  label: string;
  textInputConfig: TextInputProps;
};

export const Input = ({ label, textInputConfig }: InputProps) => {
  const inputStyles = [$textInput];
  if (textInputConfig.multiline) {
    inputStyles.push($textInputMultiline);
  }
  return (
    <View style={$inputContainer}>
      <Text style={$label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

const $inputContainer: ViewStyle = {
  marginHorizontal: 10,
  marginVertical: 6,
};

const $label: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
};

const $textInput: TextStyle = {
  borderWidth: 1,
  borderColor: 'black',
  padding: 10,
  marginVertical: 10,
  borderRadius: 10,
  backgroundColor: 'white',
};

const $textInputMultiline: TextStyle = {
  minHeight: 100,
  textAlignVertical: 'top', //ensures same behavior on Android and iOS
};
