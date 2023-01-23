// Keep track of staff ids
let staffID = 1;

// The parent class of the app; creates an employee object
class Employee {
	constructor(name, email) {
		if (typeof name !== "string" || !name.trim().length) {
			throw new Error("Expected parameter 'name' to be a non-empty string");
		}

		if (typeof email !== "string" || !email.trim().length) {
			throw new Error("Expected parameter 'Email' to be a non-empty string");
		}

		this.name = name;
		this.email = email;
		// Auto-generate the employee id
		this.id = staffID++;
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
}


module.exports = Employee;