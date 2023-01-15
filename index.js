const questions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'What is your manager\'s name?',
    },
    {
        type: 'input',
        name: 'managerId',
        message: 'What is your manager\'s ID?',
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is your manager\'s Email?',
    },
    {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is your manager\'s office number?',
    },
    {
        type: '', //dropdown listing engineer, intern, and "no more teammembers"
        name: 'teamMemberType',
        message: '',
    },
    {
        type: 'input',
        name: 'engineerName',
        message: '',
    },
    {
        type: 'input',
        name: 'engineerId',
        message: '',
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: '',
    },
    {
        type: 'input',
        name: 'engineerGitHub',
        message: '',
    },
    {
        type: 'input',
        name: 'internName',
        message: '',
    },
    {
        type: 'input',
        name: 'internId',
        message: '',
    },
    {
        type: 'input',
        name: 'internEmail',
        message: '',
    },
    {
        type: 'input',
        name: 'internSchool',
        message: '',
    },
];

/*
AS A manager I WANT to generate a webpage that displays my team's basic info
SO THAT I have quick access to their emails and GitHub profiles


GIVEN a command-line application that accepts user input

WHEN I am prompted for my team members and their information
THEN an HTML file is generated that displays a nicely formatted team roster based on user input

WHEN I click on an email address in the HTML
THEN my default email program opens and populates the TO field of the email with the address

WHEN I click on the GitHub username
THEN that GitHub profile opens in a new tab

WHEN I start the application
THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number

WHEN I enter the team manager’s name, employee ID, email address, and office number
THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team

WHEN I select the engineer option
THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu

WHEN I select the intern option
THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu

WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated
*/