import axios from 'axios';
import Expense from '../types/Expense';
import { FreshExpense } from '../store/expensesContext';

// const API_URL = 'https://expense-tracker-1b6e0-default-rtdb.firebaseio.com';
const API_URL =
  'https://react-native-course-defe9-default-rtdb.europe-west1.firebasedatabase.app/';
export const storeExpense = async (expense: FreshExpense) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expense);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  // const response = await import('../data/expenses').then((module) => {
  //   return { data: module.default };
  // }); 
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
