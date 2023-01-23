const Employee = require("./lib/employee");

let first = new Employee('Mickey', 1, 'kenaa@example.com');
let second = new Employee('Andrew', 2, 'andrew@example.com');
let third = new Employee('Jones', 3, 'jones@example.com');

console.log(first.getName(), first.getId(), first.getRole());
console.log(second.getName(), second.getId(), second.getRole());
console.log(third.getName(), third.getId(), third.getRole());

console.log(first.getCounter(), first.getLocalID());
console.log(second.getCounter(), second.getLocalID());
console.log(third.getCounter(), third.getLocalID());
