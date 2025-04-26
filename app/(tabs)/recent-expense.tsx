import { StyleSheet, Text, View } from "react-native";

import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";

const RecentExpenseScreen = () => {
  return <ExpensesOutput periodName="LAST 7 DAYS" />;
};

export default RecentExpenseScreen;

const styles = StyleSheet.create({});
