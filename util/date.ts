export const getFormattedDate = (date: Date) => {
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const formattedDay = date.getDate().toString().padStart(2, "0");
  return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
};

export function getDateMinusDay(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
