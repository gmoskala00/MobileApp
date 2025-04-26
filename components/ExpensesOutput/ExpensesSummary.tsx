import { StyleSheet, Text, View } from "react-native";
import { Expense } from "./ExpensesOutput";

import { GlobalStyles } from "@/constants/style";

type ExpensesSummaryProps = {
  expenses: Expense[];
  periodName: string;
};

const ExpensesSummary = ({ expenses, periodName }: ExpensesSummaryProps) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{periodName}</Text>
      <Text style={styles.sumText}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  sumText: {
    fontSize: 18,
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
