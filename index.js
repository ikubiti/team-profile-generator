// Include packages needed for this application
const runGenerator = require('./src/appProfile');
const { log } = require('console');

// Welcome message to the user
log('\nWelcome to the Team Profile Generator!\n');

async function init() {
	// Run the Team Profile Generator and display feedback to the user
	let userFeedBack = await runGenerator();

	// Display feedback to the user
	log(userFeedBack);
}

// Initialize and run the application
init();