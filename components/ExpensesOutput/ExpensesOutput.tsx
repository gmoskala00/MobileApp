import { StyleSheet, View } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "@/constants/style";

type ExpensesOutputProps = {
  expenses?: Expense[];
  periodName: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

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

const ExpensesOutput = ({ expenses, periodName }: ExpensesOutputProps) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
});
