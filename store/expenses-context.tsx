import { createContext, useReducer } from "react";
import { Expense, ExpenseInput } from "@/models/expense";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Pair of shoes",
    amount: 49.99,
    date: new Date("2025-04-26"),
  },
  {
    id: "e2",
    description: "Pair of trousers",
    amount: 89.99,
    date: new Date("2024-04-26"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 3.99,
    date: new Date("2024-12-25"),
  },
  {
    id: "e4",
    description: "Book",
    amount: 11.99,
    date: new Date("2025-02-02"),
  },
  {
    id: "e5",
    description: "Another Book",
    amount: 13.99,
    date: new Date("2025-02-25"),
  },
  {
    id: "e6",
    description: "Pair of trousers",
    amount: 89.99,
    date: new Date("2024-04-26"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 3.99,
    date: new Date("2024-12-25"),
  },
  {
    id: "e8",
    description: "Book",
    amount: 11.99,
    date: new Date("2025-02-02"),
  },
  {
    id: "e9",
    description: "Another Book",
    amount: 13.99,
    date: new Date("2025-02-25"),
  },
];

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: ExpenseInput) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type Props = {
  children: React.ReactNode;
};

type ReducerState = Expense[];

type ReducerAction =
  | {
      type: "ADD";
      payload: { data: ExpenseInput };
    }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "UPDATE"; payload: { id: string; data: Partial<Expense> } };

const expensesReducer = (
  state: ReducerState,
  action: ReducerAction
): ReducerState => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      const newExpense = { ...action.payload.data, id };
      return [newExpense, ...state];

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);

    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }: Props) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(data: ExpenseInput) {
    dispatch({ type: "ADD", payload: { data } });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: { id } });
  }

  function updateExpense(id: string, data: Partial<Expense>) {
    dispatch({ type: "UPDATE", payload: { id, data } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  console.log(ExpensesContext.Provider);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
