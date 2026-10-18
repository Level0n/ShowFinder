export function changeFormatDate(oldDate: string): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let date: Date = new Date(oldDate);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}