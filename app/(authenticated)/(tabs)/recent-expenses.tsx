import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "@/store/expenses-context";

import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDay } from "@/util/date";
import { fetchExpenses } from "@/util/http";
import LoadingOverlay from "@/components/ExpensesOutput/UI/LoadingOverlay";
import ErrorOverlay from "@/components/ExpensesOutput/UI/ErrorOverlay";

const RecentExpensesScreen = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDay(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="LAST 7 DAYS"
      fallbackText="No Expenses Registered for last 7 days"
    />
  );
};

export default RecentExpensesScreen;
