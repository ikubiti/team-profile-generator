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

}

module.exports = Manager;