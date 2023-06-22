import { View, Text } from 'react-native';
import { ExpensesContext } from '../store/expensesContext';
import { useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '../navigators/AppNavigation';

type ManageExpenseScreenProps = NativeStackScreenProps<AppStackParams, 'ManageExpense'>;

export const ManageExpenseScreen = ({ route, navigation }: ManageExpenseScreenProps) => {
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params.editedExpenseId;

  return (
    <View>
      <Text>Manage Expense Screen</Text>
    </View>
  );
};
