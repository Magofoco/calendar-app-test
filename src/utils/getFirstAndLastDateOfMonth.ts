export function getFirstAndLastDateOfMonth(
  monthString: string,
  yearDate: Date
): [string, string] {
  const year = yearDate.getFullYear();
  const month = parseInt(monthString, 10);

  if (isNaN(month) || month < 1 || month > 12) {
    throw new Error(
      'Invalid month. Please provide a valid month string (e.g., "03" for March).'
    );
  }

  const firstDateOfMonth = new Date(year, month - 1, 1);
  const lastDateOfMonth = new Date(year, month, 0);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return [formatDate(firstDateOfMonth), formatDate(lastDateOfMonth)];
}
