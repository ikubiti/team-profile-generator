const Employee = require("./employee");

class Engineer extends Employee {
	constructor(name, email, github) {
		super(name, email);

		if (typeof github !== "string" || !github.trim().length) {
			throw new Error("Expected parameter 'github' to be a non-empty string");
		}

		this.github = github;
	}

	// Override the getRole function
	getRole() {
		return "Engineer";
	}

	// Returns the GitHub username
	getGithub() {
		return this.github;
	}

}

module.exports = Engineer;