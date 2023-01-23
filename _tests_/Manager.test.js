const Manager = require("../lib/manager");

describe("Manager", () => {
	describe("Initialization", () => {
		it("should create a Manager object with a name, id, email, and officeNumber if provided valid arguments", () => {
			const supervisor = new Manager('Michael', 'michael@something.com', 101);

			expect(supervisor.name).toEqual("Michael");
			expect(supervisor.id).toEqual(1);
			expect(supervisor.email).toEqual("michael@something.com");
			expect(supervisor.officeNumber).toEqual(101);
		});

		it("should throw an error if provided no arguments", () => {
			const staff = () => new Manager();

			expect(staff).toThrow();
		});

		it("should throw an error if not provided an officeNumber", () => {
			const staff = () => new Manager("Michael", 'michael@something.com');
			const err = new Error("Expected parameter 'officeNumber' to be a positive number above zero");

			expect(staff).toThrowError(err);
		});

		it("should throw an error if 'name' is not a string", () => {
			const staff = () => new Manager(10, 'michael@something.com', 101);
			const err = new Error("Expected parameter 'name' to be a non-empty string");

			expect(staff).toThrowError(err);
		});

		it("should throw an error if 'officeNumber' is not a number", () => {
			const staff = () => new Manager('Michael', 'michael@something.com', '15');
			const err = new Error("Expected parameter 'officeNumber' to be a positive number above zero");

			expect(staff).toThrowError(err);
		});
	});

	describe("getName", () => {
		it("should return the name of an employee", () => {
			// Create new Managers to perform the tests
			const supervisor = new Manager('Michael', 'michael@something.com', 101);
			const staff1 = new Manager('Jones', 'jones@something.com', 120);

			// Verify that the getName() method returns the Manager's name
			expect(supervisor.getName()).toEqual('Michael');
			expect(staff1.getName()).toEqual('Jones');
		});
	});

	describe("getId", () => {
		it("should return the unique id of a Manager", () => {
			// Create new Managers to perform the tests
			const supervisor = new Manager('Michael', 'michael@something.com', 101);
			const staff1 = new Manager('Jones', 'jones@something.com', 120);
			const staff2 = new Manager('Michael Ben', 'mben@something.com', 121);

			// Verify that the getId() method returns the Manager's unique id
			expect(supervisor.getId()).toEqual(6);
			expect(staff1.getId()).toEqual(7);
			expect(staff2.getId()).toEqual(8);
		});
	});

	describe("getOffice", () => {
		it("should return the email address of a Manager", () => {
			// Create new Managers to perform the tests
			const supervisor = new Manager('Michael', 'michael@something.com', 101);
			const staff1 = new Manager('Jones', 'jones@something.com', 120);
			const staff2 = new Manager('Michael Ben', 'mben@something.com', 121);

			// Verify that the getOfficeNumber() method returns the Manager's email address
			expect(supervisor.getOfficeNumber()).toEqual(101);
			expect(staff1.getOfficeNumber()).toEqual(120);
			expect(staff2.getOfficeNumber()).toEqual(121);
		});
	});

	describe("getRole", () => {
		it("should return the role of an employee", () => {
			// Create new Managers to perform the tests
			const supervisor = new Manager('Michael', 'michael@something.com', 101);
			const staff1 = new Manager('Jones', 'jones@something.com', 120);

			// Verify that the getRole() method returns "Manager"
			expect(supervisor.getRole()).toEqual('Manager');
			expect(staff1.getRole()).toEqual('Manager');
		});
	});
});