const Engineer = require("../lib/engineer");

describe("Engineer", () => {
	describe("Initialization", () => {
		it("should create a Engineer object with a name, id, email, and github username if provided valid arguments", () => {
			const supervisor = new Engineer('Michael', 1, 'michael@something.com', 'imichael');

			expect(supervisor.name).toEqual("Michael");
			expect(supervisor.id).toEqual(1);
			expect(supervisor.email).toEqual("michael@something.com");
			expect(supervisor.github).toEqual('imichael');
			expect(supervisor.role).toEqual("Engineer");
		});

		it("should throw an error if provided no arguments", () => {
			const staff = () => new Engineer();

			expect(staff).toThrow();
		});

		it("should throw an error if not provided a Github username", () => {
			const staff = () => new Engineer("Michael", 1, 'michael@something.com');
			const err = new Error("Expected parameter 'github' to be a non-empty string");

			expect(staff).toThrowError(err);
		});

		it("should throw an error if 'email' is not a string", () => {
			const staff = () => new Engineer('Michael', 1, 25, 'imichael');
			const err = new Error("Expected parameter 'Email' to be a non-empty string");

			expect(staff).toThrowError(err);
		});

		it("should throw an error if 'github' username is not a string", () => {
			const staff = () => new Engineer('Michael', 1, 'michael@something.com', 30);
			const err = new Error("Expected parameter 'github' to be a non-empty string");

			expect(staff).toThrowError(err);
		});
	});

	describe("getEmail", () => {
		it("should return the email of an engineer", () => {
			// Create new Engineers to perform the tests
			const supervisor = new Engineer('Michael', 1, 'michael@something.com', 'imichael');
			const staff1 = new Engineer('Jones', 2, 'jones@something.com', 'jimjones');

			// Verify that the getEmail() method returns the Engineer's email address
			expect(supervisor.getEmail()).toEqual('michael@something.com');
			expect(staff1.getEmail()).toEqual('jones@something.com');
		});
	});

	describe("getId", () => {
		it("should return the unique id of a Engineer", () => {
			// Create new Engineers to perform the tests
			const supervisor = new Engineer('Michael', 6, 'michael@something.com', 'imichael');
			const staff1 = new Engineer('Jones', 7, 'jones@something.com', 'jimjones');
			const staff2 = new Engineer('Ben', 8, 'mben@something.com', 'benjohnson');

			// Verify that the getId() method returns the Engineer's unique id
			expect(supervisor.getId()).toEqual(6);
			expect(staff1.getId()).toEqual(7);
			expect(staff2.getId()).toEqual(8);
		});
	});

	describe("getGithub", () => {
		it("should return the email address of a Engineer", () => {
			// Create new Engineers to perform the tests
			const supervisor = new Engineer('Michael', 1, 'michael@something.com', 'imichael');
			const staff1 = new Engineer('Jones', 1, 'jones@something.com', 'jimjones');
			const staff2 = new Engineer('Ben', 2, 'mben@something.com', 'benjohnson');

			// Verify that the getGithub() method returns the Engineer's github username
			expect(supervisor.getGithub()).toEqual('imichael');
			expect(staff1.getGithub()).toEqual('jimjones');
			expect(staff2.getGithub()).toEqual('benjohnson');
		});
	});

	describe("getRole", () => {
		it("should return the role of an employee", () => {
			// Create new Engineers to perform the tests
			const staff1 = new Engineer('Jones', 2, 'jones@something.com', 'jimjones');
			const staff2 = new Engineer('Ben', 3, 'mben@something.com', 'benjohnson');

			// Verify that the getRole() method returns "Engineer"
			expect(staff1.getRole()).toEqual('Engineer');
			expect(staff2.getRole()).toEqual('Engineer');
		});
	});
});