import { StyleSheet, Text, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import IconButton from "@/components/ExpensesOutput/UI/IconButton";
import { GlobalStyles } from "@/constants/style";
import Button from "@/components/ExpensesOutput/UI/Button";
import { useContext } from "react";
import { ExpensesContext } from "@/store/expenses-context";

const ManageExpenseScreen = () => {
  const { expenseId } = useLocalSearchParams();
  const expensesContext = useContext(ExpensesContext);

  const isEditing = !!expenseId;

  const deleteExpenseHandler = () => {
    if (typeof expenseId == "string") {
      expensesContext.deleteExpense(expenseId);
    }
    router.back();
  };

  const cancelHandler = () => {
    router.back();
  };

  const confirmHandler = () => {
    if (isEditing) {
      if (typeof expenseId == "string") {
        expensesContext.updateExpense(expenseId, {
          description: "TEST",
          amount: 99.99,
          date: new Date("2024-12-12"),
        });
      }
    } else {
      expensesContext.addExpense({
        description: "TEST",
        amount: 99.99,
        date: new Date("2024-12-12"),
      });
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
        <Text>{expenseId}</Text>
        <View style={styles.buttonContainer}>
          <Button mode="flat" onPress={cancelHandler} style={styles.button}>
            Cancel
          </Button>
          <Button onPress={confirmHandler} style={styles.button}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </View>
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
  buttonContainer: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
