import { StyleSheet, Text, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import IconButton from "@/components/ExpensesOutput/UI/IconButton";
import { GlobalStyles } from "@/constants/style";

import { useContext } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import ExpenseForm from "@/components/ExpensesOutput/ManageExpense/ExpenseForm";
import { ExpenseInput } from "@/models/expense";

const ManageExpenseScreen = () => {
  const { expenseId } = useLocalSearchParams();
  const expensesContext = useContext(ExpensesContext);

  const isEditing = !!expenseId;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expenseId == expense.id
  );

  const deleteExpenseHandler = () => {
    if (typeof expenseId == "string") {
      expensesContext.deleteExpense(expenseId);
    }
    router.back();
  };

  const cancelHandler = () => {
    router.back();
  };

  const confirmHandler = (expenseData: ExpenseInput) => {
    if (isEditing) {
      if (typeof expenseId == "string") {
        expensesContext.updateExpense(expenseId, expenseData);
      }
    } else {
      expensesContext.addExpense(expenseData);
    }
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          title: isEditing ? "Edit Expense" : "Add Expense",
        }}
      />
      <View style={styles.container}>
        <ExpenseForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          defaultValues={selectedExpense}
        />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
