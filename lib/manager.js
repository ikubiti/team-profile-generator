const Employee = require("./employee");

class Manager extends Employee {
	constructor(name, email, officeNumber) {
		super(name, email);

		if (typeof officeNumber !== "number" || isNaN(officeNumber) || officeNumber < 1) {
			throw new Error("Expected parameter 'officeNumber' to be a positive number above zero");
		}

		this.officeNumber = officeNumber;
	}

	// Override the getRole function
	getRole() {
		return "Manager";
	}

	// Returns the office number
	getOfficeNumber() {
		return this.officeNumber;
	}

}

module.exports = Manager;