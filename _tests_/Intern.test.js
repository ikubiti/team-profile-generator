const Intern = require("../lib/intern");

describe("Intern", () => {
	describe("Initialization", () => {
		it("should create a Intern object with a name, id, email, and school name if provided valid arguments", () => {
			const firstIntern = new Intern('Michael', 1, 'michael@something.com', 'Excellence Coding College');

			expect(firstIntern.name).toEqual("Michael");
			expect(firstIntern.id).toEqual(1);
			expect(firstIntern.email).toEqual("michael@something.com");
			expect(firstIntern.school).toEqual('Excellence Coding College');
			expect(firstIntern.role).toEqual("Intern");
		});

		it("should throw an error if provided no arguments", () => {
			const staff = () => new Intern();

			expect(staff).toThrow();
		});

		it("should throw an error if not provided an id", () => {
			const staff = () => new Intern("Michael", 'michael@something.com', 'Excellence Coding College');
			const err = new Error("Expected parameter 'id' to be a positive number above zero");

			expect(staff).toThrowError(err);
		});		

		it("should throw an error if not provided a school name", () => {
			const staff = () => new Intern("Michael", 1, 'michael@something.com');
			const err = new Error("Expected parameter 'school' to be a non-empty string");

			expect(staff).toThrowError(err);
		});

		it("should throw an error if 'email' is not a string", () => {
			const staff = () => new Intern('Michael', 2, 25, 'Excellence Coding College');
			const err = new Error("Expected parameter 'Email' to be a non-empty string");

			expect(staff).toThrowError(err);
		});

		it("should throw an error if 'school' username is not a string", () => {
			const staff = () => new Intern('Michael', 3, 'michael@something.com', 30);
			const err = new Error("Expected parameter 'school' to be a non-empty string");

			expect(staff).toThrowError(err);
		});
	});

	describe("getEmail", () => {
		it("should return the email of an employee", () => {
			// Create new Interns to perform the tests
			const firstIntern = new Intern('Michael', 1, 'michael@something.com', 'Excellence Coding College');
			const secondIntern = new Intern('Jones', 2, 'jones@something.com', 'ABC Code School');

			// Verify that the getEmail() method returns the Intern's email address
			expect(firstIntern.getEmail()).toEqual('michael@something.com');
			expect(secondIntern.getEmail()).toEqual('jones@something.com');
		});
	});

	describe("getId", () => {
		it("should return the unique id of a Intern", () => {
			// Create new Interns to perform the tests
			const firstIntern = new Intern('Michael', 23, 'michael@something.com', 'Excellence Coding College');
			const secondIntern = new Intern('Jones', 35, 'jones@something.com', 'ABC Code School');
			const thirdIntern = new Intern('Ben', 237, 'mben@something.com', 'Simply Great College');

			// Verify that the getId() method returns the Intern's unique id
			expect(firstIntern.getId()).toEqual(23);
			expect(secondIntern.getId()).toEqual(35);
			expect(thirdIntern.getId()).toEqual(237);
		});
	});

	describe("getSchool", () => {
		it("should return the email address of a Intern", () => {
			// Create new Interns to perform the tests
			const firstIntern = new Intern('Michael', 1, 'michael@something.com', 'Excellence Coding College');
			const secondIntern = new Intern('Jones', 2, 'jones@something.com', 'ABC Code School');
			const thirdIntern = new Intern('Ben', 3, 'mben@something.com', 'Simply Great College');

			// Verify that the getSchool() method returns the Intern's school name
			expect(firstIntern.getSchool()).toEqual('Excellence Coding College');
			expect(secondIntern.getSchool()).toEqual('ABC Code School');
			expect(thirdIntern.getSchool()).toEqual('Simply Great College');
		});
	});

	describe("getRole", () => {
		it("should return the role of an employee", () => {
			// Create new Interns to perform the tests
			const secondIntern = new Intern('Jones', 1, 'jones@something.com', 'ABC Code School');
			const thirdIntern = new Intern('Ben', 2, 'mben@something.com', 'Simply Great College');

			// Verify that the getRole() method returns "Intern"
			expect(secondIntern.getRole()).toEqual('Intern');
			expect(thirdIntern.getRole()).toEqual('Intern');
		});
	});
});