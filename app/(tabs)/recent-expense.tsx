import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ExpensesContext } from "@/store/expenses-context";

import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDay } from "@/util/date";

const RecentExpenseScreen = () => {
  const expensesContext = useContext(ExpensesContext);

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

export default RecentExpenseScreen;

const styles = StyleSheet.create({});
