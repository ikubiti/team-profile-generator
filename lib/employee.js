
// The parent class of the app; creates an employee object
class Employee {
	constructor(name, id, email) {
		// validate the name property
		if (typeof name !== "string" || !name.trim().length) {
			throw new Error("Expected parameter 'name' to be a non-empty string");
		}

		// validate the id property
		if (typeof id !== "number" || isNaN(id) || id < 1) {
			throw new Error("Expected parameter 'id' to be a positive number above zero");
		}

		// validate the email property
		if (typeof email !== "string" || !email.trim().length) {
			throw new Error("Expected parameter 'Email' to be a non-empty string");
		}

		// set the properties
		this.name = name;
		this.email = email;
		this.role = 'Employee';
		this.id = id;
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
		return this.role;
	}

	// overrides the toString method
	toString() {
		const theName = `\x1b[33mname\x1b[0m: \x1b[35m${this.name}\x1b[0m`;
		const theId = `\x1b[33mid\x1b[0m: \x1b[35m${this.id}\x1b[0m`;
		const theEmail = `\x1b[33memail\x1b[0m: \x1b[35m${this.email}\x1b[0m`;
		const theRole = `\x1b[33mrole\x1b[0m: \x1b[35m${this.role}\x1b[0m`;

		return `${theName}, ${theId}, ${theEmail}, ${theRole}`;
	}
}


module.exports = Employee;