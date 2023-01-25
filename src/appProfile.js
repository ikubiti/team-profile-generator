// Include packages needed for this application
const inquirer = require('inquirer');
const { log } = require('console');

// const Employee = require('../lib/employee');
const Manager = require('../lib/manager');
const Engineer = require('../lib/engineer');
const Intern = require('../lib/intern');
const generateTeamPage = require('./generateHtml');

const prompt = inquirer.createPromptModule();
// Keep the list of team members for easy reference
const unitMembers = [];

// display messages in preferred colors to user to gain attention
function fontColor(color, text) {
	if (!text) return '';

	switch (color.toLowerCase()) {
		case 'black':
			return `\x1b[30m${text}\x1b[0m`;

		case 'red':
			return `\x1b[31m${text}\x1b[0m`;

		case 'green':
			return `\x1b[32m${text}\x1b[0m`;

		case 'yellow':
			return `\x1b[33m${text}\x1b[0m`;

		case 'purple': case 'magenta':
			return `\x1b[35m${text}\x1b[0m`;

		case 'cyan':
			return `\x1b[36m${text}\x1b[0m`;

		case 'white':
			return `\x1b[37m${text}\x1b[0m`;

		case 'gray':
			return `\x1b[90m${text}\x1b[0m`;

		default:
			return `\x1b[34m${text}\x1b[0m`;
	}
};

// render text in preferred color
fontRed = (text) => fontColor('red', text);
fontGreen = (text) => fontColor('green', text);
fontYellow = (text) => fontColor('yellow', text);
fontBlue = (text) => fontColor('blue', text);
fontPurple = (text) => fontColor('purple', text);
fontMagenta = (text) => fontColor('magenta', text);
fontCyan = (text) => fontColor('cyan', text);
fontWhite = (text) => fontColor('white', text);
fontGray = (text) => fontColor('gray', text);

// For easy comparison
const appPrompts = {
	createTeam: fontYellow('Create Team Profile'),
	exitFlag: fontYellow('Exit Application'),
	addEngineer: fontYellow('Add Engineer?'),
	addIntern: fontYellow('Add Intern?'),
	editMember: fontYellow('Edit an existing Team Member?'),
	finishTeam: fontYellow('Finish Team Building?'),
	inputValidation: fontRed('Please provide a valid input'),
	emailValidation: fontRed('Please provide a valid email!!!'),
	validMember: fontBlue('New Team Member Successfully Created!\n'),
	impossible: fontRed('HOW DID WE GET HERE!!!'),
};

// check for empty inputs
const checkInput = (value) => {
	if (value.trim() || value.trim().length > 0) {
		return true;
	}

	return appPrompts.inputValidation;
};

// validates number inputs
const checkNumber = (value) => {
	if (value === '') {
		return appPrompts.inputValidation;
	}

	return true;
};

// Filter input for valid numbers
const filterInput = (value) => {
	let id = parseInt(value);
	if (id) {
		return id;
	}

	return '';
};

// check for valid emails
const checkEmail = (value) => {
	let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
	if (emailFormat.test(value.trim())) {
		return true;
	}

	return appPrompts.emailValidation;
};

// The Main Application Menu
const mainMenu = [
	{
		type: 'list',
		name: 'mainSelect',
		message: fontCyan('What would you like to do?'),
		choices: [
			appPrompts.createTeam,
			appPrompts.exitFlag
		],
		waitUserInput: true,
	}
];

// The Application's submenu for team creation
const subMenu = [
	{
		type: 'list',
		name: 'subSelect',
		message: fontCyan('Would you like to ...'),
		choices: [
			appPrompts.addEngineer,
			appPrompts.addIntern,
			appPrompts.editMember,
			appPrompts.finishTeam
		],
		waitUserInput: true,
	}
];

// Prompts for team creation
const teamCreation = (employee) => {
	return [
		{
			type: 'input',
			name: 'name',
			message: fontCyan(`What is the ${employee}'s name?`),
			validate: checkInput,
			waitUserInput: true,
		},
		{
			type: 'input',
			name: 'id',
			message: fontCyan(`What is the ${employee}'s employee ID?`),
			validate: checkNumber,
			filter: filterInput,
			waitUserInput: true,
		},
		{
			type: 'input',
			name: 'email',
			message: fontCyan(`What is the ${employee}'s email address?`),
			validate: checkEmail,
			waitUserInput: true,
		},
		{
			type: 'input',
			name: 'officeNumber',
			message: fontCyan(`What is the ${employee}'s Office Number?`),
			validate: checkNumber,
			filter: filterInput,
			when() {
				return employee === 'Manager';
			},
			waitUserInput: true,
		},
		{
			type: 'input',
			name: 'github',
			message: fontCyan(`What is the ${employee}'s Github username?`),
			validate: checkInput,
			when() {
				return employee === 'Engineer';
			},
			waitUserInput: true,
		},
		{
			type: 'input',
			name: 'school',
			message: fontCyan(`What is the ${employee}'s school?`),
			validate: checkInput,
			when() {
				return employee === 'Intern';
			},
			waitUserInput: true,
		},
	];
};

// Present feedback to user
function displayFeedback(employee) {
	log(`\n${employee}\n${appPrompts.validMember}`);
}

function createMemberProfile(employee, type) {
	let newMember;
	switch (type) {
		case 'Manager':
			newMember = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
			break;

		case 'Engineer':
			newMember = new Engineer(employee.name, employee.id, employee.email, employee.github);
			break;

		case 'Intern':
			newMember = new Intern(employee.name, employee.id, employee.email, employee.school);
			break;

		// Major bug in application, just exit
		default:
			log(appPrompts.impossible);
			process.exit(1);
	}

	// Add new member
	unitMembers.push(newMember);
	// Display feedback to user
	displayFeedback(newMember);
}

// Displays the main menu and gets user selection
async function displayMainMenu() {
	return await prompt(mainMenu).then((answer) => answer);
}

async function getTeamMembers() {
	let userSelection = await prompt(subMenu).then((answer) => answer);
	// Add or update team member
	switch (userSelection.subSelect) {
		case appPrompts.addEngineer:
			userSelection = await prompt(teamCreation('Engineer')).then((answer) => answer);
			createMemberProfile(userSelection, 'Engineer');
			break;

		case appPrompts.addIntern:
			userSelection = await prompt(teamCreation('Intern')).then((answer) => answer);
			createMemberProfile(userSelection, 'Intern');
			break;

		// To come
		case appPrompts.editMember:
			break;

		// use supplied team data to create the web page
		default:
			generateTeamPage(unitMembers);
			return;
	}

	// Keep adding or editing team members
	await getTeamMembers();
}

async function createNewTeam() {
	let manager = await prompt(teamCreation('Manager')).then((answer) => answer);
	createMemberProfile(manager, 'Manager');
	await getTeamMembers();
	return '\n--- New Team Profile Successfully Generated ---\n';
}

async function init() {
	// Get user selection from main menu
	let userSelection = await displayMainMenu();

	// exits the application if user selects exit
	if (userSelection.mainSelect === appPrompts.exitFlag) {
		return '\nNew Team Profile Formation Cancelled!';
	}

	// Inform user about formation of new team profile
	log(fontGreen('\n--- Constructing New Team Profile ---\n'));

	// Create or update team profile
	userSelection = await createNewTeam();

	// Message from team creation process
	return fontGreen(userSelection);
}

// Guide the user through the team creation process
async function runGenerator() {
	let processMessage = await init();
	return `${fontRed(processMessage)}`;
}

module.exports = runGenerator;