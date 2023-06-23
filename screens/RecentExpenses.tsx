import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { fetchExpenses } from '../utils/http';
import Expense from '../types/Expense';

export const RecentExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getExpenses = async () => {
    const expenses = await fetchExpenses();
    setExpenses(expenses);
    setIsLoading(false);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <View style={$container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ExpensesOutput expensesPeriod="the last 7 days" />
      )}
    </View>
  );
};

const $container: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};
