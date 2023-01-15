const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern');

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
    type: 'list', //dropdown listing engineer, intern, and "no more teammembers"
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
            else console.log("at this stage we generate the HTML document. You have to figure out how to gather the objects.");
        })
}

function buildTeam() {
    console.log("Please answer the following questions to build your engineering team.");
    createManager();
}

//GIVEN a command-line application that accepts user input
buildTeam();


/*
WHEN I am prompted for my team members and their information
THEN an HTML file is generated that displays a nicely formatted team roster based on user input

WHEN I click on an email address in the HTML
THEN my default email program opens and populates the TO field of the email with the address

WHEN I click on the GitHub username
THEN that GitHub profile opens in a new tab

WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated
*/