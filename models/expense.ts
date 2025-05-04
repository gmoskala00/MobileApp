export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export type ExpenseInput = {
  description: string;
  amount: number;
  date: Date;
};
