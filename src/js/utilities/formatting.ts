export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format")
  }

  const year = date.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = date.getMonth()
  const month = monthNames[monthIndex]
  const day = date.getDate();
  const hour = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${month} ${day} ${year}, ${hour}:${min}`;
}
