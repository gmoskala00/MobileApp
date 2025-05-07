import { StyleSheet, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import IconButton from "@/components/ExpensesOutput/UI/IconButton";
import { GlobalStyles } from "@/constants/style";

import { useContext, useState } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import ExpenseForm from "@/components/ExpensesOutput/ManageExpense/ExpenseForm";
import { ExpenseInput } from "@/models/expense";
import { deleteExpense, storeExpense, updateExpense } from "@/util/http";
import LoadingOverlay from "@/components/ExpensesOutput/UI/LoadingOverlay";
import ErrorOverlay from "@/components/ExpensesOutput/UI/ErrorOverlay";

const ManageExpenseScreen = () => {
  const [isSubmitting, setIsSumbitting] = useState(false);
  const [error, setError] = useState("");

  const { expenseId } = useLocalSearchParams();
  const expensesContext = useContext(ExpensesContext);

  const isEditing = !!expenseId;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expenseId == expense.id
  );

  const deleteExpenseHandler = async () => {
    if (typeof expenseId == "string") {
      setIsSumbitting(true);
      try {
        await deleteExpense(expenseId);
        expensesContext.deleteExpense(expenseId);
        router.back();
      } catch (error) {
        setError("Could not Delete Expense, try again later");
        setIsSumbitting(false);
      }
    }
  };

  const cancelHandler = () => {
    router.back();
  };

  const confirmHandler = async (expenseData: ExpenseInput) => {
    setIsSumbitting(true);
    try {
      if (isEditing) {
        if (typeof expenseId == "string") {
          expensesContext.updateExpense(expenseId, expenseData);
          await updateExpense(expenseId, expenseData);
        }
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id: id });
      }
      router.back();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsSumbitting(false);
    }
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

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
