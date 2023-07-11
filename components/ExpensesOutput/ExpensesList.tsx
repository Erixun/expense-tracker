import { FlatList, View, Text } from 'react-native';
import Expense from '../../types/Expense';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
  expenses: Expense[];
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  const renderExpenseItem = ({ item }: { item: Expense }) => {
    return <ExpenseItem {...item} />;
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      keyExtractor={(item) => item.id}
      data={expenses.reverse()}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
