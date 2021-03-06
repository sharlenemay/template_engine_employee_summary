const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Paths created

// console.log to understand paths and what is being passed through require();
// console.log("path:", path);
const OUTPUT_DIR = path.resolve(__dirname, "output");
// console.log('OUTPUT_DIR:', OUTPUT_DIR);
// const outputPath = path.join(OUTPUT_DIR, "team.html");
console.log('OUTPUT_Path:', outputPath);

const render = require("./lib/htmlRenderer");

const teamMembers = [];

const managerQ = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your office number?",
    name: "office",
  },
];

const engineerQ = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your github?",
    name: "github",
  },
];

const internQ = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your school?",
    name: "school",
  },
];

// function init for inquirer to prompt questions
// conditional statements for question answers
// .then function(response){
// write data to html}
function init() {
    //start by creating manager
    addManager();
};

//   inquirer.prompt(roleQ).then((response) => {
//     if (response.role == "Manager") {
//       inquirer.prompt(managerQ).then((response) => {
//         // calling the class to create an object with response.github
//         const man = new Manager(
//           response.name,
//           response.id,
//           response.email,
//           response.office
//         );
//         // push responses to array
//         teamMembers.push(man);
//         console.log(teamMembers);
//       });
//     }
    // else if (response.role == "Engineer"){
    //     inquirer.prompt(engineerQ)
    //     .then (response => {
    //         const eng = new Engineer(response.name, response.id, response.email, response.github);
    //         teamMembers.push(eng);
    //         console.log(teamMembers);
    //     })
    // }
    // else {
    // inquirer.prompt(internQ)
    // .then (response => {
    //     const int = new Intern (response.name, response.id, response.email, response.school);
    //     teamMembers.push(int);
    //     console.log(teamMembers);
    // })
    // }
  //});

function addManager() {
  inquirer.prompt(managerQ).then((response) => {
    // calling the class to create an object with response.github
    const man = new Manager(
      response.name,
      response.id,
      response.email,
      response.office
    );
    // push responses to array
    teamMembers.push(man);
    // console.log(teamMembers);
    createTeam();
  });
};

function addEngineer() {
  inquirer.prompt(engineerQ).then((response) => {
    const eng = new Engineer(
      response.name,
      response.id,
      response.email,
      response.github
    );
    teamMembers.push(eng);
    // console.log(teamMembers);
    createTeam();
  });
};

function addIntern() {
  inquirer.prompt(internQ).then((response) => {
    const int = new Intern(
      response.name,
      response.id,
      response.email,
      response.school
    );
    teamMembers.push(int);
    // console.log(teamMembers);
    createTeam();
  });
};

//to keep the promise running we chain inquire
function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "What type of team member do you want to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
          break;
      }
    });
}

function buildTeam() {
    // console.log("teamMembers: ", teamMembers);

    console.log("success");
    //create out put folder if it does not exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    //create the team.html file and write it's contents
    // const render from htmlRenderer.js
    fs.writeFileSync(outputPath,render(teamMembers),"utf-8");
}

//initate questionaire
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
