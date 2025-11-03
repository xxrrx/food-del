// Format number to VND currency with dot separator
// Example: 1000000 -> "1.000.000"
export const formatVND = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0";
  }
  return Number(amount).toLocaleString('de-DE');
};
