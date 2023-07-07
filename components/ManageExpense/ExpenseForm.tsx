import React, { useContext, useState } from 'react';
import { View, ViewStyle, Text, TextStyle, Pressable } from 'react-native';
import { Input } from './Input';
import { palette } from '../../theme/colors';
import { ExpenseNavigation } from '../../screens';
import Expense from '../../types/Expense';
import { ExpensesContext, FreshExpense } from '../../store/expensesContext';

type FieldKey = 'amount' | 'date' | 'description';

type ExpenseFormProps = {
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: (data: FreshExpense) => void;
  submitButtonLabel: string;
  defaultValues?: FreshExpense;
} & ExpenseNavigation;

export const ExpenseForm = ({
  navigation,
  isEditing,
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues
}: ExpenseFormProps) => {

  const [form, setForm] = useState({
    amount: defaultValues?.amount.toString() || '',
    date: defaultValues?.date.toISOString().slice(0, 10) ||'',
    description: defaultValues?.description || '',
  });

  const fieldChangedHandler = (field: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

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

  const expensesContext = useContext(ExpensesContext);
  const submitHandler = () => {
    console.log('submit - not implemented');
    const expenseData = {
      amount: +form.amount,
      date: new Date(form.date),
      description: form.description,
    };
    // if (isEditing) {
    //   const id = route.params?.id;
    //   expensesContext.updateExpense(editedExpenseId!);
    // } else {
    //   expensesContext.addExpense(expenseData);
    // }
    onSubmit(expenseData);
    // navigation.goBack();
  };

  return (
    <View style={$form}>
      <Text style={$title}>Your Expense</Text>
      <View style={$formRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: 'numeric',
            onChangeText: fieldChangedHandler.bind(this, 'amount'),
            value: form.amount,
          }}
          containerStyle={$rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            keyboardType: 'numeric', //'numbers-and-punctuation',
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: fieldChangedHandler.bind(this, 'date'),
            value: form.date,
          }}
          containerStyle={$rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: fieldChangedHandler.bind(this, 'description'),
          value: form.description,
          // numberOfLines: 4,
          // autoCapitalize: 'sentences',
          // autoCorrect: true,
        }}
      />
      <View style={$buttonGroup}>
        <Pressable
          android_ripple={{ color: 'grey' }}
          style={[$button]}
          onPress={onCancel}
        >
          <Text style={$btnText}>Cancel</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: 'green' }}
          style={[$button, { backgroundColor: palette.primary.main }]}
          onPress={submitHandler}
        >
          <Text style={[$btnText, { color: 'white' }]}>
            {submitButtonLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const $form: ViewStyle = {
  marginTop: 30,
  // flex: 1,
  // borderWidth: 1,
};

const $title: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  marginVertical: 20,
  textAlign: 'center',
  color: palette.primary.dark,
};
const $formRow: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const $rowInput: ViewStyle = {
  flex: 1,
};

const $buttonGroup: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  // gap: 10,
  width: '100%',
};

const $button: ViewStyle = {
  width: '40%',
  padding: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'black',
  alignItems: 'center',
};

const $btnText: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
};
