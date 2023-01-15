const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern');
const ourTeam = [];
const organizedTeam = [];
let htmlCardString = ``;
let numberOfTeamMembers = 0;

const managerQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'What is your manager\'s name?',
        validate: (answer) => {
            if(answer) {
                return true;
            }
            else return 'Please provide a name.'
        }
    },
    {
        type: 'input',
        name: 'managerId',
        message: 'What is your manager\'s ID?',
        validate: (answer) => {
            if(answer > 0) {
                return true;
            }
            else return 'Please provide a number greater than zero.'
        }
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is your manager\'s Email?',
        validate: (answer) => {
            if(answer.includes("@")) {
                return true;
            }
            else return 'Your input didn\'t include an @ symbol. Please input a valid Email address.'
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is your manager\'s office number? Please include area code and hyphens.',
        validate: (answer) => {
            if(typeof answer === 'string' && answer.length === 12) {
                return true;
            }
            else return 'Please enter a ten-digit phone number for the office number with hyphens.'
        }
    },
];

const teamMemberQuestion =     {
    type: 'list',
    name: 'teamMemberType',
    message: 'Which team member would you like to add next?',
    choices: ['Engineer','Intern','No other team members']
}

const engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: 'What is your engineer\'s name?',
        validate: (answer) => {
            if(answer) {
                return true;
            }
            else return 'Please provide a name.'
        }
    },
    {
        type: 'input',
        name: 'engineerId',
        message: 'What is your engineer\'s ID?',
        validate: (answer) => {
            if(answer > 0) {
                return true;
            }
            else return 'Please provide a number greater than zero.'
        }
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is your engineer\'s Email address?',
        validate: (answer) => {
            if(answer.includes("@")) {
                return true;
            }
            else return 'Your input didn\'t include an @ symbol. Please input a valid Email address.'
        }
    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: 'What is your engineer\'s github username?',
        validate: (answer) => {
            if(answer) {
                return true;
            }
            else return 'Please provide the engineer\'s github username.'
        }
    },
]

const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: 'What is your intern\'s name?',
        validate: (answer) => {
            if(typeof answer === "string" && answer) {
                return true;
            }
            else return 'Please provide a name.'
        }
    },
    {
        type: 'input',
        name: 'internId',
        message: 'What is your intern\'s ID?',
        validate: (answer) => {
            if(answer > 0) {
                return true;
            }
            else return 'Please provide a number greater than zero.'
        }
    },
    {
        type: 'input',
        name: 'internEmail',
        message: 'What is your intern\'s Email?',
        validate: (answer) => {
            if(answer.includes("@")) {
                return true;
            }
            else return 'Your input didn\'t include an @ symbol. Please input a valid Email address.'
        }
    },
    {
        type: 'input',
        name: 'internSchool',
        message: 'What is your intern\'s school?',
        validate: (answer) => {
            if(answer && typeof answer === "string") {
                return true;
            }
            else return 'Please provide the school the intern attends.'
        }
    },
]

//WHEN I start the application
//THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
function createManager() {
    return inquirer
        .prompt(managerQuestions)
        .then((answers) => {
            const manager = new Manager(
                answers.managerName,
                answers.managerId,
                answers.managerEmail,
                answers.officeNumber,
            );
            ourTeam.push(manager);
            numberOfTeamMembers++;
            //WHEN I enter the team manager’s name, employee ID, email address, and office number
            //THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
            addTeamMember();
        })
}

function createEngineer() {
    return inquirer
        .prompt(engineerQuestions)
        .then((answers) => {
            const engineer = new Engineer(
                answers.engineerName,
                answers.engineerId,
                answers.engineerEmail,
                answers.engineerGithub
            );
            ourTeam.push(engineer);
            numberOfTeamMembers++;
            addTeamMember();
        })
}

function createIntern() {
    return inquirer
        .prompt(internQuestions)
        .then((answers) => {
            const intern = new Intern(
                answers.internName,
                answers.internId,
                answers.internEmail,
                answers.internSchool
            );
            ourTeam.push(intern);
            numberOfTeamMembers++;
            addTeamMember();
        })
}

function addTeamMember() {
    return inquirer
        .prompt(teamMemberQuestion)
        .then((answer) => {
            //WHEN I select the engineer option
            //THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
            if(answer.teamMemberType === 'Engineer') {
                createEngineer();
            }
            //WHEN I select the intern option
            //THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
            else if(answer.teamMemberType === 'Intern') {
                createIntern();
            }
            //WHEN I decide to finish building my team
            //THEN I exit the application, and the HTML is generated
            else {
                organizeTeam(ourTeam);
                generateHtml(organizedTeam);
                buildPage(htmlCardString);
            }
        })
}

function organizeTeam(team) {
    let masterIndex = 0;
    for (let index = 0; index < numberOfTeamMembers; index++) {
        if(team[index].getRole() === "Manager") {
            organizedTeam[masterIndex] = team[index];
            masterIndex++;
        }
    }
    for (let index = 0; index < numberOfTeamMembers; index++) {
        if(team[index].getRole() === "Engineer") {
            organizedTeam[masterIndex] = team[index];
            masterIndex++;
        }
    }
    for (let index = 0; index < numberOfTeamMembers; index++) {
        if(team[index].getRole() === "Intern") {
            organizedTeam[masterIndex] = team[index];
            masterIndex++;
        }
    }
}

//WHEN I click on an email address in the HTML
//THEN my default email program opens and populates the TO field of the email with the address
function generateHtml(team) {    
    for (let index = 0; index < numberOfTeamMembers; index++) {
        if(team[index].getRole() === "Manager") {
            htmlCardString += `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title bg-primary text-white">${team[index].getName()}</h5>
              <p class="card-text">ID: ${team[index].getId()}<br>
              Email: <a href="mailto: ${team[index].getEmail()}" class="link-primary">${team[index].getEmail()}</a><br>
              Office Number: ${team[index].getOfficeNumber()}</p>
            </div>
          </div>`;
        }
        if(team[index].getRole() === "Engineer") {
            htmlCardString += `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title bg-primary text-white">${team[index].getName()}</h5>
              <p class="card-text">ID: ${team[index].getId()}<br>
              Email: <a href="mailto: ${team[index].getEmail()}" class="link-primary">${team[index].getEmail()}</a><br>
              Github: <a href="https://github.com/${team[index].getGithub()}" class="link-primary">${team[index].getGithub()}</a></p>
            </div>
          </div>`;
        }
        if(team[index].getRole() === "Intern") {
            htmlCardString +=`<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title bg-primary text-white">${team[index].getName()}</h5>
              <p class="card-text">ID: ${team[index].getId()}<br>
              Email: <a href="mailto: ${team[index].getEmail()}" class="link-primary">${team[index].getEmail()}</a><br>
              School: ${team[index].getSchool()}</p>
            </div>
          </div>`;
        }
    }
}

//WHEN I am prompted for my team members and their information
//THEN an HTML file is generated that displays a nicely formatted team roster based on user input
//WHEN I click on the GitHub username
//THEN that GitHub profile opens in a new tab
function buildPage(htmlCardData) {
    let pageHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <title>My Team</title>
    </head>
    <body>
        <div class="container-fluid">
            <div class="col-12  mb-3">
                <h1 class="text-center bg-danger text-white">My Team</h1>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    ${htmlCardData}
            </div>
        </div>
    </body>
    </html>`

    fs.writeFile("index.html", pageHtml, (err) =>
        err ? console.log(err) : console.log('Success!'))
}

function runProgram() {
    console.log("Please answer the following questions to build your engineering team.");
    createManager();
}

//GIVEN a command-line application that accepts user input
runProgram();