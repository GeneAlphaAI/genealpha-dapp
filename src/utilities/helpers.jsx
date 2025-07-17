// Helper function to format numbers with commas
export const formatValue = (value) => {
  // Check if the value is a number (not a string with letters)
  if (
    typeof value === "number" ||
    (typeof value === "string" && /^\d+$/.test(value))
  ) {
    return typeof value === "string"
      ? parseInt(value).toLocaleString()
      : value.toLocaleString();
  }
  // Return as-is for alphanumeric strings (like addresses)
  return value;
};
