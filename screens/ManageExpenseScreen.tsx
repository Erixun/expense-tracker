import { View, ViewStyle, Alert } from 'react-native';
import { ExpensesContext, FreshExpense } from '../store/expensesContext';
import { useContext, useLayoutEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '../navigators/AppNavigation';
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import { LoadingOverlay } from '../components/LoadingOverlay';

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
    setIsSubmitting(true);
    if (isEditing) {
      await updateExpense(editedExpenseId, data);
      expensesContext.updateExpense({ id: editedExpenseId, ...data });
    } else {
      const id = await storeExpense(data);
      expensesContext.addExpense({ ...data, id: id });
    }
    navigation.goBack();
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
          await deleteExpense(editedExpenseId);
          expensesContext.deleteExpense(editedExpenseId);
          navigation.goBack();
        },
      },
    ]);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

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

// const $buttonGroup: ViewStyle = {
//   flexDirection: 'row',
//   justifyContent: 'space-around',
//   // gap: 10,
//   width: '100%',
// };

// const $button: ViewStyle = {
//   width: '40%',
//   padding: 10,
//   borderRadius: 10,
//   borderWidth: 1,
//   borderColor: 'black',
//   alignItems: 'center',
// };

// const $btnText: TextStyle = {
//   fontSize: 16,
//   fontWeight: 'bold',
// };
