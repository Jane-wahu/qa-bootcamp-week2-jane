type Customer = {
  name: string;
  address?: {
    city: string;
  };
};

let customer1: Customer = { name: "Jane", address: { city: "Nairobi" } };
let customer2: Customer = { name: "Dorothy" };

console.log(customer1.address?.city);
console.log(customer2.address?.city);
console.log(customer2.address?.city ?? "No city given");