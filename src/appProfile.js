// Include packages needed for this application
const inquirer = require('inquirer');
const { log } = require('console');

// const Employee = require('../lib/employee');
const Manager = require('../lib/manager');
const Engineer = require('../lib/engineer');
const Intern = require('../lib/intern');
const generateHtml = require('./generateHtml');

const prompt = inquirer.createPromptModule();

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
	createTeam: fontYellow('Create New Team Profile'),
	exitFlag: fontYellow('Exit Application'),
	addEngineer: fontYellow('Add Engineer?'),
	addIntern: fontYellow('Add Intern?'),
	finishTeam: fontYellow('Finish Team Creation?'),
};

const mainMenu = [
	{
		type: 'list',
		name: 'mainSelect',
		message: fontCyan('What would you like to do?'),
		choices: [
			appPrompts.createTeam,
			appPrompts.exitFlag
		],
	}
];

const subMenu = [
	{
		type: 'list',
		name: 'subSelect',
		message: fontCyan('Would you like to ...'),
		choices: [
			appPrompts.addEngineer,
			appPrompts.addIntern,
			appPrompts.finishTeam
		],
	}
];

// Displays the main menu and gets user selection
async function displayMainMenu() {
	return await prompt(mainMenu).then((answer) => answer);
}

async function createNewTeam() {
	return await prompt(subMenu).then((answer) => answer);
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

	userSelection = await createNewTeam();

	return fontGreen('\n--- New Team Profile Successfully Generated ---\n');
}

async function runGenerator() {
	let processMessage = await init();
	return `${fontRed(processMessage)}`;
}

module.exports = runGenerator;