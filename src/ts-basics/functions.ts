// Years before 2026 use the old rate (1.2). 2026 and every year after it use the current rate (1.3), on purpose.
function calculateTax(income: number, taxYear: number = 2026): number {
  if (taxYear < 2026) {
    return income * 1.2;
  }
  return income * 1.3;
}

console.log(calculateTax(10000));
console.log(calculateTax(10000, 2025));