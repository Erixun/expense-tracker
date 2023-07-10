import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { fetchExpenses } from '../utils/http';
import Expense from '../types/Expense';
import { ExpensesContext } from '../store/expensesContext';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ErrorOverlay } from '../components/ErrorOverlay';
import { AxiosError } from 'axios';

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  const toMessage = (error: AxiosError) => {
    setError(error.message);
  };
  const getExpenses = async () => {
    fetchExpenses()
      .then(expensesCtx.setExpenses)
      .catch(toMessage)
      .finally(() => {
        setIsFetching(false);
      });
    // setIsLoading(false);
  };
  // const expenses = await fetchExpenses();
  // expensesCtx.setExpenses(expenses);
  // setIsLoading(false);
  // };

  useEffect(() => {
    getExpenses();
  }, []);

  const clearError = () => {
    setError('');
  };

  const recentExpenses = expensesCtx.expenses.filter(
    (expense) => expense.date > getDateDaysAgo(7)
  );

  if (isFetching) return <LoadingOverlay />;
  if (error) return <ErrorOverlay message={error} onConfirm={clearError} />;

  return (
    <View style={$container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="the last 7 days"
      />
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
