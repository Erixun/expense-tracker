import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Pressable,
  Alert,
} from 'react-native';
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
  onDelete: () => void;
  submitButtonLabel: string;
  defaultValues?: FreshExpense;
} & ExpenseNavigation;

const ErrorMessage = {
  required: 'This field is required',
  invalidDateFormat: 'Invalid date format',
  invalidAmount: 'Invalid amount, must be a number greater than 0',
  invalidDescription: 'Invalid description, cannot be empty',
};

type ExpenseFormState = {
  amount: FormField;
  date: FormField;
  description: FormField;
};

type FormField = {
  value: string;
  isValid: boolean;
};
export const ExpenseForm = ({
  navigation,
  isEditing,
  onCancel,
  onSubmit,
  onDelete,
  submitButtonLabel,
  defaultValues,
}: ExpenseFormProps) => {
  const [form, setForm] = useState<ExpenseFormState>({
    amount: { value: defaultValues?.amount.toString() || '', isValid: true },
    date: {
      value: defaultValues?.date.toISOString().slice(0, 10) || '',
      isValid: true,
    },
    description: { value: defaultValues?.description || '', isValid: true },
  });

  const fieldChangedHandler = (field: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: { value, isValid: true },
    }));
  };

  // const amountChangedHandler = (text: string) => {
  //   setForm((prevState) => ({
  //     ...prevState,
  //     amount: text,
  //   }));
  // };

  // const dateChangedHandler = (text: string) => {
  //   setForm((prevState) => ({
  //     ...prevState,
  //     date: text,
  //   }));
  // };

  // const descriptionChangedHandler = (text: string) => {
  //   setForm((prevState) => ({
  //     ...prevState,
  //     description: text,
  //   }));
  // };

  const isValidSubmission = () => {
    return Object.values(form).every((field) => field.isValid);
  };

  const expensesContext = useContext(ExpensesContext);
  const submitHandler = async () => {
    // const expenseData: FreshExpense = {
    //   amount: +form.amount.value,
    //   date: new Date(form.date.value),
    //   description: form.description.value,
    // };

    const validExpense = await doFormValidation(form);
    try {
      onSubmit(validExpense);
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    setIsFormValid(isValidSubmission());
  }, [form]);

  const [isFormValid, setIsFormValid] = useState(true);

  const doFormValidation = async (
    data: ExpenseFormState
  ): Promise<FreshExpense> => {
    const amount = +data.amount.value;
    const isAmountValid = !isNaN(amount) && amount > 0;

    const dateString = data.date.value;
    const date = new Date(dateString);
    const isDateValid =
      date.toString() !== 'Invalid Date' &&
      /\d{4}-\d{2}-\d{2}/.test(dateString);
    const description = data.description.value;
    const isDescriptionValid = description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setForm((prevState) => ({
        ...prevState,
        amount: { value: prevState.amount.value, isValid: isAmountValid },
        date: { value: prevState.date.value, isValid: isDateValid },
        description: {
          value: prevState.description.value,
          isValid: isDescriptionValid,
        },
      }));
      setIsFormValid(false);
      throw new Error('Invalid form data');
    }

    return {
      amount,
      date,
      description,
    };
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
            value: form.amount.value,
          }}
          containerStyle={$rowInput}
          isValid={form.amount.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            keyboardType: 'numeric', //'numbers-and-punctuation',
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: fieldChangedHandler.bind(this, 'date'),
            value: form.date.value,
          }}
          isValid={form.date.isValid}
          containerStyle={$rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: fieldChangedHandler.bind(this, 'description'),
          value: form.description.value,
          // numberOfLines: 4,
          // autoCapitalize: 'sentences',
          // autoCorrect: true,
          // style: {
          //   color: form.description.isValid ? 'black' : 'red',
          // }
        }}
        isValid={form.description.isValid}
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
      {isEditing && (
        <Pressable
          android_ripple={{ color: 'red' }}
          style={[
            $button,
            { backgroundColor: 'red', alignSelf: 'center', marginVertical: 20 },
          ]}
          onPress={() => {
            onDelete();
          }}
        >
          <Text style={[$btnText, { color: 'white' }]}>Delete</Text>
          {/* <Ionicon name="trash" size={30} color="red" /> */}
        </Pressable>
      )}
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
