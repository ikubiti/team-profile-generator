const Employee = require("./employee");

class Intern extends Employee {
	constructor(name, id, email, school) {
		// initialize the parent class
		super(name, id, email);

		if (typeof school !== "string" || !school.trim().length) {
			throw new Error("Expected parameter 'school' to be a non-empty string");
		}

		// override the role of the intern
		this.role = 'Intern';
		this.school = school;
	}

	// Override the getRole function but redundant to redefine it here
	// getRole() {
	// 	return this.role;
	// }

	// Returns the GitHub username
	getSchool() {
		return this.school;
	}

}

module.exports = Intern;