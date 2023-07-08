import { FlatList, View, Text } from 'react-native';
import Expense from '../../types/Expense';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
  expenses: Expense[];
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  const renderExpenseItem = ({ item }: { item: Expense }) => {
    return <ExpenseItem {...item} />;
    // const { id, title, amount, description, category, date } = item;

    // return (
    //   <View
    //     style={{
    //       padding: 15,
    //       borderWidth: 1,
    //       borderRadius: 5,
    //       elevation: 5,
    //       marginVertical: 5,
    //       backgroundColor: 'white',
    //     }}
    //   >
    //     <Text>{date.toLocaleDateString('sv-SE')}</Text>
    //     <Text>{title}</Text>
    //     <Text>Category: {category}</Text>
    //     <Text>Amount: {amount} kr</Text>
    //     <Text>Note: {description}</Text>
    //   </View>
    // );
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
