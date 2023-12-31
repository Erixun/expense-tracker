import { View, ViewStyle, Alert } from 'react-native';
import { ExpensesContext, FreshExpense } from '../store/expensesContext';
import { useContext, useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '../navigators/AppNavigation';
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ErrorOverlay } from '../components/ErrorOverlay';
import { AxiosError } from 'axios';

export type ManageExpenseScreenProps = NativeStackScreenProps<
  AppStackParams,
  'ManageExpense'
>;

export type ExpenseNavigation = Omit<ManageExpenseScreenProps, 'route'>;

export const ManageExpenseScreen = ({
  route,
  navigation,
}: ManageExpenseScreenProps) => {
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.editedExpenseId;
  const isEditing = !!editedExpenseId;

  const defaultValues = isEditing
    ? expensesContext.expenses.find((expense) => expense.id === editedExpenseId)
    : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const submitExpenseHandler = async (data: FreshExpense) => {
    console.log('submitExpenseHandler');
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateExpense(editedExpenseId, data);
        expensesContext.updateExpense({ id: editedExpenseId, ...data });
      } else {
        const id = await storeExpense(data);
        expensesContext.addExpense({ ...data, id: id });
      }
      navigation.goBack();
    } catch (err) {
      console.log('err', err);
      return handleError(err);
    }
  };

  const errorConfirmedHandler = () => {
    setError('');
    navigation.goBack();
  };

  const handleError = (err: AxiosError | unknown) => {
    setIsSubmitting(false);
    if (err instanceof AxiosError) {
      return setError(err.message);
    }
    setError('Something went wrong');
  };
  const deleteExpenseHandler = () => {
    if (!editedExpenseId) return;
    setIsSubmitting(true);
    Alert.alert('Are you sure?', 'Do you really want to delete this expense?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteExpense(editedExpenseId);
            expensesContext.deleteExpense(editedExpenseId);
            navigation.goBack();
          } catch (err) {
            handleError(err);
          }
        },
      },
    ]);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (error && !isSubmitting)
    return <ErrorOverlay message={error} onConfirm={errorConfirmedHandler} />;
  if (isSubmitting) return <LoadingOverlay />;

  return (
    <View style={$container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Save'}
        onCancel={cancelHandler}
        onSubmit={submitExpenseHandler}
        onDelete={deleteExpenseHandler}
        isEditing={isEditing}
        navigation={navigation}
        defaultValues={defaultValues}
      />
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-start',
  padding: 10,
};
