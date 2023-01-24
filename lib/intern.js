const Employee = require("./employee");

class Intern extends Employee {
	constructor(name, email, school) {
		super(name, email);

		if (typeof school !== "string" || !school.trim().length) {
			throw new Error("Expected parameter 'school' to be a non-empty string");
		}

		this.school = school;
	}

	// Override the getRole function
	getRole() {
		return "Intern";
	}

	// Returns the GitHub username
	getSchool() {
		return this.school;
	}

}

module.exports = Intern;