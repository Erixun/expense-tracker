import axios from 'axios';
import Expense from '../types/Expense';
import { FreshExpense } from '../store/expensesContext';

const API_URL =
  'https://react-native-course-defe9-default-rtdb.europe-west1.firebasedatabase.app';

export const storeExpense = async (expense: FreshExpense) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expense);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses.json`);
  const expenseData = response.data;
  const expenses: Expense[] = [];

  for (const key in expenseData) {
    const expense: Expense = {
      id: key,
      amount: expenseData[key].amount,
      date: new Date(expenseData[key].date),
      description: expenseData[key].description,
    };
    expense.date = new Date(expense.date);
    expenses.push(expense);
  }

  return expenses;
};

export const updateExpense = async (id: string, expenseData: FreshExpense) => {
  await axios.put(`${API_URL}/expenses/${id}.json`, expenseData);
  return { id, ...expenseData } as Expense;
};

export const deleteExpense = (id: string) => {
  return axios.delete(`${API_URL}/expenses/${id}.json`);
};
