import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Expense from '../types/Expense';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: <Expense[]>[],
  },
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
  },
});
