import axios from 'axios';
import Expense from '../types/Expense';

const API_URL = 'https://expense-tracker-1b6e0-default-rtdb.firebaseio.com';

export const storeExpense = async (expense: Expense) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expense);
  return response.data;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses.json`);

  const expenses: Expense[] = [];

  for (const key in response.data) {
    const expense: Expense = {
      id: key,
      ...response.data[key],
    };
    expenses.push(expense);
  }

  return expenses;
};
