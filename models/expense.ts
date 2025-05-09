export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  userId: string;
};

export type ExpenseInput = {
  description: string;
  amount: number;
  date: Date;
  userId?: string;
};
