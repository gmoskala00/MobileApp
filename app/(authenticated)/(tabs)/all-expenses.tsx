import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { AuthContext } from "@/store/auth-context";
import { fetchExpenses } from "@/util/http";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import ErrorOverlay from "@/components/UI/ErrorOverlay";

export default function Index() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const { userId } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExpenses() {
      try {
        const fetched = await fetchExpenses(userId);
        setExpenses(fetched);
      } catch {
        setError("Could not load expenses");
      }
      setIsLoading(false);
    }

    loadExpenses();
  }, [userId]);

  if (isLoading) return <LoadingOverlay />;
  if (error) return <ErrorOverlay message={error} />;

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No Expenses Registered"
    />
  );
}
