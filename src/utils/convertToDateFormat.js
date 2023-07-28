function convertToDateFormat(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Pad the day and month with leading zeros if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export default convertToDateFormat;

export const  revertToDateFormat = (formattedDateString) => {
  // Split the formatted date string into day, month, and year parts
  const [day, month, year] = formattedDateString.split('/');

  // Convert day, month, and year parts to numbers
  const dayNumber = parseInt(day, 10);
  const monthNumber = parseInt(month, 10);
  const yearNumber = parseInt(year, 10);

  // Create a new Date object with the parsed day, month, and year
  const date = new Date(yearNumber, monthNumber - 1, dayNumber);

  // Check if the date is valid (i.e., not NaN)
  if (isNaN(date.getTime())) {
    // Date is invalid, return null or handle the error as needed
    return null;
  }

  return date;
}


