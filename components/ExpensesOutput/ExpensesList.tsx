import { StyleSheet, FlatList, Text, ListRenderItemInfo } from "react-native";

import { Expense } from "./ExpensesOutput";
import ExpenseItem from "./ExpenseItem";

type ExpensesListProps = {
  expenses: Expense[];
};

const renderExpenseItem = ({ item }: ListRenderItemInfo<Expense>) => {
  return <ExpenseItem {...item} />;
};

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
