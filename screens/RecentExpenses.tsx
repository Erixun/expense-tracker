import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { fetchExpenses } from '../utils/http';
import Expense from '../types/Expense';
import { ExpensesContext } from '../store/expensesContext';

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  // const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //TODO: proper fetch from firebase
  // const getExpenses = async () => {
  //   const expenses = await fetchExpenses();
  //   // setExpenses(expenses);
  //   expensesCtx.setExpenses(expenses);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getExpenses();
  // }, []);

  const recentExpenses = expensesCtx.expenses.filter(
    (expense) => expense.date > getDateDaysAgo(7)
  );

  return (
    <View style={$container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="the last 7 days" />
      )}
    </View>
  );
};

function getDateDaysAgo(days: number, date = new Date()) {
  const dateDaysAgo = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - days
  );
  return dateDaysAgo;
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};
