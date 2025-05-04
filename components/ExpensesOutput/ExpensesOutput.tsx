import { StyleSheet, View, Text } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "@/constants/style";
import { Expense } from "@/models/expense";

type ExpensesOutputProps = {
  expenses: Expense[];
  periodName: string;
  fallbackText?: string;
};

const ExpensesOutput = ({
  expenses,
  periodName,
  fallbackText,
}: ExpensesOutputProps) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 32,
  },
});
