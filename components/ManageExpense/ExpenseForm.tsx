import React from 'react';
import { View } from 'react-native';
import { Input } from './Input';

export const ExpenseForm = (props: any) => {
  const amountChangedHandler = (text: string) => {
    console.log(text);
  };
  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: 'numbers-and-punctuation',
          onChangeText: amountChangedHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          keyboardType: "numbers-and-punctuation",
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: (text: string) => console.log(text),
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
        }}
      />
    </View>
  );
};
