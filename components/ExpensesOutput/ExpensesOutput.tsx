import { View } from 'react-native';
import Expense from '../../types/Expense';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

type ExpensesOutputProps = {
  expenses: Expense[];
  expensesPeriod: string;
};

const ExpensesOutput = ({ expenses, expensesPeriod }: ExpensesOutputProps) => {
  return (
    <View style={{ flex: 1, gap: 5, marginVertical: 10, paddingHorizontal: 20 }}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;
