import React, { useState, useEffect, useContext } from 'react';
import { View, TextStyle, ViewStyle } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import Expense from '../types/Expense';
import { fetchExpenses } from '../utils/http';
import { ExpensesContext } from '../store/expensesContext';

export const AllExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const expenseseCtx = useContext(ExpensesContext);

  //TODO: proper fetch from firebase
  // const getExpenses = async () => {
  //   try {
  //     const expenses = await fetchExpenses();
  //     setExpenses(expenses);
  //   } catch (error) {
  //     // setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleRefresh = async () => {
  //   setRefreshing(true);
  //   await getExpenses();
  //   setRefreshing(false);
  // };

  // useEffect(() => {
  //   getExpenses();
  // }, []);

  const allExpenses = expenseseCtx.expenses;

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
