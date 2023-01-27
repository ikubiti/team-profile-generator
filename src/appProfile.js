// Include packages needed for this application
const inquirer = require('inquirer');
const { log } = require('console');

// Require to create objects from the application classes
const Manager = require('../lib/manager');
const Engineer = require('../lib/engineer');
const Intern = require('../lib/intern');
const generateTeamPage = require('./generateHtml');

const prompt = inquirer.createPromptModule();
// Keep the list of team members for easy reference
let teamManager;
const teamEngineers = [];
const teamInterns = [];
const allIDs = [];

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
	idValidation: fontRed('Please provide a different "Id number", current Id number already in use'),
	emailValidation: fontRed('Please provide a valid email!!!'),
	validMember: fontBlue('New Team Member Successfully Created!\n'),
	impossible: fontRed('HOW DID WE GET HERE!!!'),
	editPrompt: fontYellow('Select the members you wish to edit or update:'),
	editMembers: fontYellow('Choose the properties you wish to edit:'),
	noMembers: fontRed('\nPlease add members to your team first!!!\n'),
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

	if (typeof value === 'number') {
		return true;
	}

	return appPrompts.idValidation;
};

// Filter input for id numbers
const filterIdInput = (value) => {
	let val = parseInt(value);
	if (val) {
		if (allIDs.includes(val)) {
			return value;
		}

		return val;
	}

	return '';
};

// Filter input for valid numbers
const filterInput = (value) => {
	let val = parseInt(value);
	if (val) {
		return val;
	}

	return '';
};

// Filter Team members to edit
const filterUpdate = (answers, teamList) => {
	let tempAns = [...teamList];
	let ans = [];
	tempAns.forEach((member) => {
		let aMember = `${member.name} - ${member.id} - ${member.role}`;
		if (answers.includes(aMember)) {
			ans.push(member);
			let index = teamList.indexOf(member);
			teamList.splice(index, 1);
			index = allIDs.indexOf(member.id);
			allIDs.splice(index, 1);
		}
	});

	return ans;
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
			filter: filterIdInput,
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
			message: fontCyan(`What is the name ${employee}'s school?`),
			validate: checkInput,
			when() {
				return employee === 'Intern';
			},
			waitUserInput: true,
		},
	];
};

// Get single input from user
const singleInput = (customPrompt) => {
	return {
		type: 'input',
		name: 'custom',
		message: fontYellow(customPrompt),
		validate: checkInput,
		waitUserInput: true,
	};
};

// Get single number input from user
const singleNumber = (customPrompt) => {
	return {
		type: 'input',
		name: 'customNumber',
		message: fontYellow(customPrompt),
		validate: checkNumber,
		filter: filterIdInput,
		waitUserInput: true,
	};
};

// Generate eligible team members for updates
const listMembers = (members, msg) => {
	return {
		type: 'checkbox',
		message: msg,
		name: 'ans',
		pageSize: 7,
		choices: members,
		waitUserInput: true,
	};
};

// control the team editing process
async function getAllUpdates(updateTeam) {
	for (let member of updateTeam) {
		let displayMember = '';
		let options = [];
		for (aKey in member) {
			options.push({ name: `Edit ${aKey}` });
			if (displayMember != '') {
				displayMember += ', ';
			}
			displayMember += `(${aKey}: ${member[aKey]})`;
		}

		// Show current member to user
		log(fontPurple(`\n${displayMember}`));
		let { ans } = await prompt(listMembers(options, appPrompts.editMembers)).then((answer) => answer);
		for (aKey in member) {
			if (!ans.includes(`Edit ${aKey}`)) continue;
			switch (aKey) {
				case 'role':
					// Automatic role selection
					if (member[aKey] === 'Engineer') {
						member[aKey] = 'Intern';
						delete member.github;
						let { custom } = await prompt(singleInput('Edit school')).then((answer) => answer);
						member.school = custom;
					} else {
						member[aKey] = 'Engineer';
						delete member.school;
						let { custom } = await prompt(singleInput('Edit github')).then((answer) => answer);
						member.github = custom;
					}
					break;

				case 'id':
					let { customNumber } = await prompt(singleNumber(`Edit ${aKey}`)).then((answer) => answer);
					member[aKey] = customNumber;
					break;

				default:
					let { custom } = await prompt(singleInput(`Edit ${aKey}`)).then((answer) => answer);
					member[aKey] = custom;
			}
		}

		// Add new member to team
		createMemberProfile(member, member.role);
	};

}

// Present feedback to user
function displayFeedback(employee) {
	log(`\n${employee}\n${appPrompts.validMember}`);
}

function createMemberProfile(employee, type) {
	let newMember;
	// create and save new members
	switch (type) {
		case 'Manager':
			newMember = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
			teamManager = newMember;
			break;

		case 'Engineer':
			newMember = new Engineer(employee.name, employee.id, employee.email, employee.github);
			teamEngineers.push(newMember);
			break;

		case 'Intern':
			newMember = new Intern(employee.name, employee.id, employee.email, employee.school);
			teamInterns.push(newMember);
			break;

		// Major bug in application, just exit
		default:
			log(appPrompts.impossible);
			process.exit(1);
	}

	// save new id
	allIDs.push(newMember.id);
	// Display feedback to user
	displayFeedback(newMember);
}

// Update existing members except the manager
async function updateMembers() {
	// Get all the eligible members
	const members = [...teamEngineers, ...teamInterns];
	// Get user selection
	const selectList = [];
	members.forEach((member) => {
		selectList.push({ name: `${member.name} - ${member.id} - ${member.role}` });
	});
	let { ans } = await prompt(listMembers(selectList, appPrompts.editPrompt)).then((answer) => answer);
	let updateMembers = [...filterUpdate(ans, teamEngineers), ...filterUpdate(ans, teamInterns)];
	await getAllUpdates(updateMembers);
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
			if (teamEngineers.length > 0 || teamInterns > 0) {
				await updateMembers();
			} else {
				log(appPrompts.noMembers);
			}
			break;

		// use supplied team data to create the web page
		default:
			if (teamEngineers.length > 0 || teamInterns > 0) {
				const unitMembers = [teamManager, ...teamEngineers, ...teamInterns];
				generateTeamPage(unitMembers);
				return;
			} else {
				log(appPrompts.noMembers);
			}
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