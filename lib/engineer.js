const Employee = require("./employee");

class Engineer extends Employee {
	constructor(name, id, email, github) {
		// initialize the parent class
		super(name, id, email);

		if (typeof github !== "string" || !github.trim().length) {
			throw new Error("Expected parameter 'github' to be a non-empty string");
		}

		// override the role of the employee
		this.role = 'Engineer';
		this.github = github;
	}

	// Override the getRole function but redundant to redefine it here
	// getRole() {
	// 	return this.role;
	// }

	// Returns the GitHub username
	getGithub() {
		return this.github;
	}

}

module.exports = Engineer;