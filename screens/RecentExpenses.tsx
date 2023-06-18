import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

export const RecentExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getExpenses = async () => {
    // const expenses = await getRecentExpenses();
    setExpenses(expenses);
    setIsLoading(false);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <View style={$container}>
      {/* <Text style={$title}>Recent Expenses</Text> */}
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

const $title: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
};
