import { View, Text } from 'react-native';
import Expense from '../../types/Expense';
import { palette } from '../../theme/colors';

interface ExpensesSummaryProps {
  expenses: Expense[];
  periodName: string;
}

const ExpensesSummary = ({ expenses, periodName }: ExpensesSummaryProps) => {
  const totalAmount = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  return (
    <View style={{padding: 20, backgroundColor: palette.primary.dark, }}>
      <Text style={{color: "white", fontSize: 16}}>
        Total: {totalAmount.toFixed(2)} kr for {periodName}
      </Text>
    </View>
  );
};

export default ExpensesSummary;
