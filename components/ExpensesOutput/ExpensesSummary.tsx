import { View, Text } from 'react-native';
import Expense from '../../types/Expense';

interface ExpensesSummaryProps {
  expenses: Expense[];
  periodName: string;
}

const ExpensesSummary = ({ expenses, periodName }: ExpensesSummaryProps) => {
  const totalAmount = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  return (
    <View>
      <Text>
        Total: {totalAmount.toFixed(2)} kr for {periodName}
      </Text>
    </View>
  );
};

export default ExpensesSummary;
