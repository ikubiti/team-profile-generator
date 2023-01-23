const Employee = require("../lib/employee");

describe("Employee", () => {
	describe("Initialization", () => {
		it("should create an Employee object with a name, id, and employee if provided valid arguments", () => {
			const supervisor = new Employee('Michael', 'michael@something.com');

			expect(supervisor.name).toEqual("Michael");
			expect(supervisor.id).toEqual(1);
			expect(supervisor.email).toEqual("michael@something.com");
		});

		it("should throw an error if provided no arguments", () => {
			const cb = () => new Employee();

			expect(cb).toThrow();
		});

		it("should throw an error if not provided an id", () => {
			const cb = () => new Employee("Michael");
			const err = new Error("Expected parameter 'Email' to be a non-empty string");

			expect(cb).toThrowError(err);
		});

		it("should throw an error if 'name' is not a string", () => {
			const cb = () => new Employee(10, 'michael@something.com');
			const err = new Error("Expected parameter 'name' to be a non-empty string");

			expect(cb).toThrowError(err);
		});

		it("should throw an error if 'email' is not a string", () => {
			const cb = () => new Employee("Michael", 15);
			const err = new Error("Expected parameter 'Email' to be a non-empty string");

			expect(cb).toThrowError(err);
		});
	});

	describe("getName", () => {
		it("should return the name of an employee", () => {
			// Create new Employees to perform the tests
			const supervisor = new Employee('Michael', 'michael@something.com');
			const staff1 = new Employee('Jones', 'jones@something.com');

			// Verify that the getName() method returns the employee's name
			expect(supervisor.getName()).toEqual('Michael');
			expect(staff1.getName()).toEqual('Jones');
		});
	});

	describe("getId", () => {
		it("should return the unique id of an employee", () => {
			// Create new Employees to perform the tests
			const supervisor = new Employee('Michael', 'michael@something.com');
			const staff1 = new Employee('Jones', 'jones@something.com');
			const staff2 = new Employee('Michael Ben', 'mben@something.com');

			// Verify that the getId() method returns the employee's unique id
			expect(supervisor.getId()).toEqual(4);
			expect(staff1.getId()).toEqual(5);
			expect(staff2.getId()).toEqual(6);
		});
	});

	describe("getEmail", () => {
		it("should return the email address of an employee", () => {
			// Create new Employees to perform the tests
			const supervisor = new Employee('Michael', 'michael@something.com');
			const staff1 = new Employee('Jones', 'jones@something.com');
			const staff2 = new Employee('Michael Ben', 'mben@something.com');

			// Verify that the getEmail() method returns the employee email address
			expect(supervisor.getEmail()).toEqual('michael@something.com');
			expect(staff1.getEmail()).toEqual('jones@something.com');
			expect(staff2.getEmail()).toEqual('mben@something.com');
		});
	});

	describe("getRole", () => {
		it("should return the role of an employee", () => {
			// Create new Employees to perform the tests
			const supervisor = new Employee('Michael', 'michael@something.com');
			const staff1 = new Employee('Jones', 'jones@something.com');

			// Verify that the getRole() method returns "Employee"
			expect(supervisor.getRole()).toEqual('Employee');
			expect(staff1.getRole()).toEqual('Employee');
		});
	});
});