import axios from 'axios';
import Expense from '../types/Expense';
import { FreshExpense } from '../store/expensesContext';

// const API_URL = 'https://expense-tracker-1b6e0-default-rtdb.firebaseio.com';
const API_URL =
  'https://react-native-course-defe9-default-rtdb.europe-west1.firebasedatabase.app';
export const storeExpense = async (expense: FreshExpense) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expense);
  console.log(response.data)
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  // const response = await import('../data/expenses').then((module) => {
  //   return { data: module.default };
  // });
  const response = await axios.get(`${API_URL}/expenses.json`);
  console.log(response.data);

  const expenses: Expense[] = [];

  const expenseData = response.data;
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
