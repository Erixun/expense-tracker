import { View, Text, TextInput, TextInputProps } from 'react-native';

export const Input = ({
  label,
  textInputConfig,
}: {
  label: string;
  textInputConfig: TextInputProps;
}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
};
