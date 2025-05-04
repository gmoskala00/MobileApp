import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "@/store/expenses-context";

export default function Index() {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      periodName="Total"
      fallbackText="No Expenses Registered"
    />
  );
}
