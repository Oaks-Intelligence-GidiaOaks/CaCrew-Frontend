function formatPrice(number) {
  if (!number) {
    return;
  }
  // Convert the number to a string and remove any leading/trailing spaces
  const numStr = String(number).trim();

  // Check if the number is valid
  if (!numStr.match(/^\d+(\.\d+)?$/)) {
    return;
  }

  // Split the number into integer and decimal parts (if any)
  const [integerPart, decimalPart] = numStr.split(".");

  // Format the integer part
  let formattedInteger = "";
  for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
    formattedInteger = integerPart[i] + formattedInteger;
    if (count === 2 || count === 5 || count === 8) {
      formattedInteger = "," + formattedInteger; // Add comma as a separator
    }
  }

  // Combine integer part and decimal part (if any) and return the formatted price
  const formattedPrice = decimalPart
    ? formattedInteger + "." + decimalPart
    : formattedInteger;

  return formattedPrice;
}

export default formatPrice;
