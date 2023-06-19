import { View } from 'react-native';
import Expense from '../../types/Expense';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

const DUMMY_EXPENSES: Expense[] = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    description: 'Toilet paper for the house',
    amount: 94.12,
    date: new Date(2020, 7, 14),
    category: 'Household',
  },
  {
    id: 'e2',
    title: 'New TV',
    description: 'New TV for the living room',
    amount: 799.49,
    date: new Date(2021, 2, 12),
    category: 'Electronics',
  },
  {
    id: 'e3',
    title: 'Car Insurance',
    description: 'Car insurance for the new car',
    amount: 294.67,
    date: new Date(2021, 2, 28),
    category: 'Car',
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    description: 'Wooden desk for the new home office',
    amount: 450,
    date: new Date(2021, 5, 12),
    category: 'Furniture',
  },
];

type ExpensesOutputProps = {
  expensesPeriod: string;
};

const ExpensesOutput = ({ expensesPeriod }: ExpensesOutputProps) => {
  const expenses = DUMMY_EXPENSES; //TODO: replace with real data
  return (
    <View style={{flex: 1, gap: 5, marginVertical: 10}}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;
