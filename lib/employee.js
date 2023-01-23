// Testing
let counter = 0;

// The parent class of the app; creates an employee object
class Employee {
	constructor(name, id, email) {
		this.name = name;
		this.id = id;
		this.email = email;
		counter++;
	}

	// Returns the name of the employee
	getName() {
		return this.name;
	}

	// Returns the id of the employee
	getId() {
		return this.id;
	}

	// Returns the email of the employee
	getEmail() {
		return this.email;
	}

	// Returns the role of the employee
	getRole() {
		return 'Employee';
	}

	// Checking
	getCounter() {
		return counter;
	}

}


module.exports = Employee;