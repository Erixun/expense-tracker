import { View, Text, Pressable } from 'react-native';
import { ExpensesContext } from '../store/expensesContext';
import { useContext, useLayoutEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '../navigators/AppNavigation';
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';

type ManageExpenseScreenProps = NativeStackScreenProps<
  AppStackParams,
  'ManageExpense'
>;

export const ManageExpenseScreen = ({
  route,
  navigation,
}: ManageExpenseScreenProps) => {
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params.editedExpenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <ExpenseForm />
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log('save - not implemented')
            if (isEditing) {
              // expensesContext.editExpense(editedExpenseId!);
            } else {
              // expensesContext.addExpense();
            }
            navigation.goBack();
          }}
        >
          <Text>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};
