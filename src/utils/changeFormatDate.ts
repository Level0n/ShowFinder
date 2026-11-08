export function changeFormatDate(oldDate: string | null): string {
  if (oldDate === null) return 'Error date format';
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date: Date = new Date(oldDate);
  if (Number.isNaN(date.getTime())) return 'Invalid date';
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}