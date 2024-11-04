export function formatDate(dateString) {
  const dateToFormat = dateString;
  const date = new Date(dateToFormat);
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
