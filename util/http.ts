import axios from "axios";
import { ExpenseInput } from "@/models/expense";

const BACKEND_URL =
  "https://expenses-tracker-a1f77-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData: ExpenseInput) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses(userId: string) {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];
  for (const key in response.data) {
    const expense = response.data[key];

    if (expense.userId === userId) {
      expenses.push({
        id: key,
        amount: expense.amount,
        date: new Date(expense.date),
        description: expense.description,
        userId: expense.userId,
      });
    }
  }

  return expenses;
}

export function updateExpense(id: string, expenseData: ExpenseInput) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
