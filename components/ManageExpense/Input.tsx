import { TextStyle, ViewStyle } from 'react-native';
import { View, Text, TextInput, TextInputProps } from 'react-native';

type InputProps = {
  label: string;
  textInputConfig: TextInputProps;
  containerStyle?: ViewStyle;
  isValid: boolean;
};

export const Input = ({
  label,
  textInputConfig,
  containerStyle,
  isValid,
}: InputProps) => {
  const inputStyles = [$textInput];
  if (textInputConfig.multiline) {
    inputStyles.push($textInputMultiline);
  }

  if (!isValid) inputStyles.push({ borderColor: 'red', backgroundColor: '#fbd7d7' });

  const error = (
    <Text style={{ color: 'red', marginTop: -5, marginBottom: 5, marginHorizontal: 10, fontStyle: 'italic' }}>
      {!isValid && !textInputConfig?.value
        ? 'Cannot be empty'
        : !isValid
        ? 'Invalid input'
        : null}
    </Text>
  );
  {
    /* </Text> : !isValid? <Text style={{ color: 'red' }}>Invalid value</Text> : null; */
  }
  return (
    <View style={[$inputContainer, containerStyle]}>
      <Text style={$label}>{label}</Text>
      <TextInput style={[inputStyles]} {...textInputConfig} />
      {error}
    </View>
  );
};

const $inputContainer: ViewStyle = {
  // borderWidth: 1,
  // flex: 1,
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
  borderWidth: 1,
  textAlignVertical: 'top', //ensures same behavior on Android and iOS
};
