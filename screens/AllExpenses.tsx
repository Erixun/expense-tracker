import React, { useState, useEffect } from "react";
import { View, TextStyle, ViewStyle } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import Expense from "../types/Expense";
import { fetchExpenses } from "../utils/http";

export const AllExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getExpenses = async () => {
    try {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
    } catch (error) {
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getExpenses();
    setRefreshing(false);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  if (loading) {
    // return <Loading />;
  }

  if (error) {
    // return <Error message={error} />;
  }

  return (
    <View style={$container}>
      <ExpensesOutput expensesPeriod="All Expenses" />
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};
