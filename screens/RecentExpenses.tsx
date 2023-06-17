import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';

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
      <Text style={$title}>Recent Expenses</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text>Recent Expenses</Text>
        // <FlatList
        //   data={expenses}
        //   renderItem={({ item }) => (
        //     <ExpenseItem
        //       id={item.id}
        //       title={item.title}
        //       amount={item.amount}
        //       date={item.date}
        //     />
        //   )}
        //   keyExtractor={(item) => item.id}
        // />
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
