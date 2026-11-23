function calculateTax(income: number, taxYear :
number = 2026) : number {
    if (taxYear < 2026) {
        return income * 1.2;
    }
    return income * 1.3;

    }
    console.log(calculateTax(10000));
    console.log(calculateTax(10000, 2025));
