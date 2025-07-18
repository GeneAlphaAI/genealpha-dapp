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

export function truncateMiddle(text, maxLength) {
  if (text?.length <= maxLength) return text;
  const half = Math.floor(maxLength / 2);
  return `${text?.slice(0, half)}...${text?.slice(-half)}`;
}
