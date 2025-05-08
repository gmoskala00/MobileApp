import { createContext, useReducer } from "react";
import { Expense } from "@/models/expense";

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
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
      payload: Expense;
    }
  | {
      type: "SET";
      payload: { expenses: Expense[] };
    }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "UPDATE"; payload: { id: string; data: Partial<Expense> } };

const expensesReducer = (
  state: ReducerState,
  action: ReducerAction
): ReducerState => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "SET":
      const inverted = action.payload.expenses.reverse();
      return inverted;

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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expense: Expense) {
    dispatch({ type: "ADD", payload: expense });
  }

  function setExpenses(expenses: Expense[]) {
    dispatch({ type: "SET", payload: { expenses } });
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
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
