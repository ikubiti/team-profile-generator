// Include packages needed for this application
const fs = require('fs');
const path = require('path');
const { log } = require('console');
const teamPage = './dist/index.html';
let pageContents = '';

function addEngineer(engineer) {
	pageContents += `<div class="col col-md-6 col-lg-4 g-md-2 g-3">
				<div class="card">
					<header class="card-header ter-bg">
						<h2>${engineer.name}</h2>
						<p class="font-header"> <img src="./assets/images/icon-engineer.png" alt="Safety Glasses" class="img-size">
							Engineer</p>
					</header>
	
					<div class="card-body card-bg">
						<div class="card-shadow">
							<p class="card-text">ID: ${engineer.id}</p>
							<p class="card-text">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
							<p class="card-text">Github: <a href="https://github.com/${engineer.github}" target="_blank" rel="noopener noreferrer">${engineer.github}</a></p>
						</div>
					</div>
				</div>
			</div>\n`;
}

function addIntern(intern) {
	pageContents += `<div class="col col-md-6 col-lg-4 g-md-2 g-3">
				<div class="card">
					<header class="card-header ter-bg">
						<h2>${intern.name}</h2>
						<p class="font-header"> <img src="./assets/images/icon-intern.png" alt="Graduate Student" class="img-size">
							Intern</p>
					</header>
	
					<div class="card-body card-bg">
						<div class="card-shadow">
							<p class="card-text">ID: ${intern.id}</p>
							<p class="card-text">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
							<p class="card-text">School: ${intern.school}</p>
						</div>
					</div>
				</div>
			</div>\n`;
}

function generateHead(manager) {
	pageContents += `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${manager.name}'s Team Profile</title>
	
	<!-- Bootstrap CSS -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
	
	<link rel="stylesheet" href="./assets/css/style.css" />
</head>

<body>
	<header class="p-2 text-center sec-bg">
		<h1 class="display-3 title-header">${manager.name} - TEAM PROFILE</h1>
	</header>
	
	<main>
	<div class="container">
		<div class="row">
			<div class="col col-md-6 col-lg-4 g-md-2 g-3">
				<div class="card">
					<header class="card-header ter-bg">
						<h2>${manager.name}</h2>
						<p class="font-header"> <img src="./assets/images/icon-manager.png" alt="Coffee" class="img-size">
							Manager</p>
					</header>
	
					<div class="card-body card-bg">
						<div class="card-shadow">
							<p class="card-text">ID: ${manager.id}</p>
							<p class="card-text">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
							<p class="card-text">Office number: ${manager.officeNumber}</p>
						</div>
					</div>
				</div>
			</div>
`;
}

function addTeamMembers(team) {
	for (let i = 1; i < team.length; i++) {
		if (team[i].role === 'Engineer') {
			addEngineer(team[i]);
		} else {
			addIntern(team[i]);
		}
	}
}

function addTail() {
	pageContents += `</div>
	</div>
</main>
	
	<footer class="p-2 border-1 border-top border-dark text-center outline-deco sec-bg">
		<h4>&copy; 2023 Isoyor Kubiti</h4>
	</footer>
</body>
</html>`;
}

// Write to the README file
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) =>
		err ? console.log(err) : console.log("Successfully created your team profile!\n")
	);
}


// Use user input to generate the html file
async function generateTeamPage(teamMembers) {
	generateHead(teamMembers[0]);;
	addTeamMembers(teamMembers);
	addTail();
	writeToFile(teamPage, pageContents);
	log(teamMembers);
	return `Did it!!!`;
}


module.exports = generateTeamPage;