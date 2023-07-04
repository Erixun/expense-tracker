import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from './Input';

export const ExpenseForm = (props: any) => {
  const [form, setForm] = useState({
    amount: '',
    date: '',
    description: '',
  });

  const amountChangedHandler = (text: string) => {
    setForm((prevState) => ({
      ...prevState,
      amount: text,
    }));
  };

  const dateChangedHandler = (text: string) => {
    setForm((prevState) => ({
      ...prevState,
      date: text,
    }));
  };

  const descriptionChangedHandler = (text: string) => {
    setForm((prevState) => ({
      ...prevState,
      description: text,
    }));
  };

  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: 'numeric',
          onChangeText: amountChangedHandler,
          value: form.amount,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          keyboardType: 'numeric', //'numbers-and-punctuation',
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: dateChangedHandler,
          value: form.date,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: descriptionChangedHandler,
          value: form.description,
          // numberOfLines: 4,
          // autoCapitalize: 'sentences',
          // autoCorrect: true,
        }}
      />
    </View>
  );
};
