import React, { useContext } from 'react';
import { View, ViewStyle } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expensesContext';

export const AllExpenses = () => {
  const expenseseCtx = useContext(ExpensesContext);

  const allExpenses = expenseseCtx.expenses.sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });

  return (
    <View style={$container}>
      <ExpensesOutput expenses={allExpenses} expensesPeriod="All Expenses" />
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};
