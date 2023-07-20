function capitalizeInitials(name) {
  // remove white spaces not in between string and split
  const words = name ? name.trim().split(" ") : "";

  if (words.length === 1) {
    // If there's only one word without a space, capitalize its first letter and return.
    return words[0].charAt(0).toUpperCase();
  } else if (words.length >= 2) {
    // If there are two or more words, take the first letter of each word, capitalize them, and return only first two.
    const initials = words
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase());
    return initials.join("");
  }

  // If there are no words, return an empty string.
  return "--";
}

export default capitalizeInitials;
