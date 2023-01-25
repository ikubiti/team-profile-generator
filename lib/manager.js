const Employee = require("./employee");

class Manager extends Employee {
	constructor(name, id, email, officeNumber) {
		// initialize the parent class
		super(name, id, email);

		if (typeof officeNumber !== "number" || isNaN(officeNumber) || officeNumber < 1) {
			throw new Error("Expected parameter 'officeNumber' to be a positive number above zero");
		}

		this.officeNumber = officeNumber;
		// override the role of the employee
		this.role = 'Manager';
	}

	// Override the getRole function but redundant to redefine it here
	// getRole() {
	// 	return this.role;
	// }

	// Returns the office number
	getOfficeNumber() {
		return this.officeNumber;
	}

	// Overrides the default toString function
	toString() {
		const theOfficeNumber = `\x1b[33mOffice Number\x1b[0m: \x1b[35m${this.officeNumber}\x1b[0m`;
		return `{ ${super.toString()}, ${theOfficeNumber} }`;
	}

}

module.exports = Manager;