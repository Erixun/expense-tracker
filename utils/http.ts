import axios from 'axios';
import Expense from '../types/Expense';

const API_URL = 'https://expense-tracker-1b6e0-default-rtdb.firebaseio.com';

export const storeExpense = async (expense: Expense) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expense);
  return response.data;
};
