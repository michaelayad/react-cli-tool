#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");
const shell = require("shelljs");
const fs = require("fs-extra");
const path = require("path");

// Define the CLI options
program
  .version("1.0.0")
  .description("A CLI tool to generate a React project with dynamic configurations using Vite");

// Prompt the user for choices
const questions = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
    default: "my-react-app",
  },
  {
    type: "input",
    name: "projectPath",
    message: "Where should the project be created? (Provide a full path)",
    default: process.cwd(),
    validate: (input) => {
      if (!fs.existsSync(input)) {
        return `The path "${input}" does not exist. Please provide a valid path.`;
      }
      return true;
    },
  },
  {
    type: "list",
    name: "stylingLibrary",
    message: "Which styling library would you like to use?",
    choices: ["Tailwind CSS", "Sass", "Bootstrap", "None"],
  },
  {
    type: "list",
    name: "theme",
    message: "Which theme would you like to use?",
    choices: ["Light", "Dark"],
  },
  {
    type: "list",
    name: "stateManagement",
    message: "Which state management library would you like to use?",
    choices: ["Zustand", "Redux", "Recoil", "None"],
  },
  {
    type: "list",
    name: "formLibrary",
    message: "Which form library would you like to use?",
    choices: ["React Hook Form", "Formik", "None"],
  },
  {
    type: "confirm",
    name: "useRouter",
    message: "Would you like to use React Router DOM?",
    default: true,
  },
  {
    type: "confirm",
    name: "useI18n",
    message: "Would you like to use i18n for internationalization?",
    default: false,
  },
  {
    type: "confirm",
    name: "useTypeScript",
    message: "Would you like to use TypeScript?",
    default: true,
  },
];

// Handle the user's choices
program.action(async () => {
  // Dynamically import chalk (ESM)
  const chalk = await import("chalk");

  const answers = await inquirer.prompt(questions);

  console.log(chalk.default.green("Setting up your project..."));

  // Define the project path
  const projectPath = path.join(answers.projectPath, answers.projectName);

  // Check if the project path already exists
  if (fs.existsSync(projectPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: `The directory "${projectPath}" already exists. Do you want to overwrite it?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.default.yellow("Project creation aborted."));
      process.exit(1);
    }

    // Remove the existing directory
    fs.removeSync(projectPath);
    console.log(chalk.default.yellow(`Removed existing directory at ${projectPath}.`));
  }

  // Create the project directory
  fs.mkdirSync(projectPath, { recursive: true });
  console.log(chalk.default.green(`Project will be created at ${projectPath}.`));

  // Create a new Vite project
  console.log(chalk.default.blue("Creating a new Vite project..."));
  const template = answers.useTypeScript ? "react-ts" : "react";
  shell.exec(`npm create vite@latest ${answers.projectName} -- --template ${template}`, { cwd: answers.projectPath });

  // Move into the project directory
  shell.cd(projectPath);

  // Install dependencies
  console.log(chalk.default.blue("Installing dependencies..."));
  shell.exec("npm install");

  // Install and configure the chosen styling library
  if (answers.stylingLibrary === "Tailwind CSS") {
    console.log(chalk.default.blue("Installing Tailwind CSS..."));
    shell.exec("npm install tailwindcss postcss autoprefixer");
    shell.exec("npx tailwindcss init -p");
    fs.copySync(path.join(__dirname, "templates", "tailwind", "tailwind.config.js"), path.join(projectPath, "tailwind.config.js"));
    fs.copySync(path.join(__dirname, "templates", "tailwind", "postcss.config.js"), path.join(projectPath, "postcss.config.js"));
    fs.copySync(path.join(__dirname, "templates", "tailwind", "assets"), path.join(projectPath, "src", "assets"));
    // Copy the selected theme
    const themeFile = answers.theme === "Light" ? "light.css" : "dark.css";
    fs.copySync(path.join(__dirname, "templates", "tailwind", "assets", "themes", themeFile), path.join(projectPath, "src", "assets", "themes", "theme.css"));
  } else if (answers.stylingLibrary === "Sass") {
    console.log(chalk.default.blue("Installing Sass..."));
    shell.exec("npm install sass");
    fs.copySync(path.join(__dirname, "templates", "sass", "assets"), path.join(projectPath, "src", "assets"));
    // Copy the selected theme
    const themeFile = answers.theme === "Light" ? "light.scss" : "dark.scss";
    fs.copySync(path.join(__dirname, "templates", "sass", "assets", "themes", themeFile), path.join(projectPath, "src", "assets", "themes", "theme.scss"));
  } else if (answers.stylingLibrary === "Bootstrap") {
    console.log(chalk.default.blue("Installing Bootstrap..."));
    shell.exec("npm install bootstrap @popperjs/core");
    fs.copySync(path.join(__dirname, "templates", "bootstrap", "assets"), path.join(projectPath, "src", "assets"));
    // Copy the selected theme
    const themeFile = answers.theme === "Light" ? "light.scss" : "dark.scss";
    fs.copySync(path.join(__dirname, "templates", "bootstrap", "assets", "themes", themeFile), path.join(projectPath, "src", "assets", "themes", "theme.scss"));
  }

  if (answers.stateManagement === "Zustand") {
    console.log(chalk.default.blue("Installing Zustand..."));
    shell.exec("npm install zustand");
    fs.copySync(path.join(__dirname, "templates", "store.ts"), path.join(projectPath, "src", "store", "store.ts"));
  } else if (answers.stateManagement === "Redux") {
    console.log(chalk.default.blue("Installing Redux..."));
    shell.exec("npm install @reduxjs/toolkit react-redux");
    fs.copySync(path.join(__dirname, "templates", "reduxStore.ts"), path.join(projectPath, "src", "store", "reduxStore.ts"));
  }

  if (answers.formLibrary === "React Hook Form") {
    console.log(chalk.default.blue("Installing React Hook Form..."));
    shell.exec("npm install react-hook-form yup");
  }

  if (answers.useRouter) {
    console.log(chalk.default.blue("Installing React Router DOM..."));
    shell.exec("npm install react-router-dom");
    fs.copySync(path.join(__dirname, "templates", "Router.tsx"), path.join(projectPath, "src", "Router.tsx"));
  }

  if (answers.useI18n) {
    console.log(chalk.default.blue("Installing i18n..."));
    shell.exec("npm install i18next react-i18next");
    fs.copySync(path.join(__dirname, "templates", "i18n.ts"), path.join(projectPath, "src", "i18n.ts"));
  }

  // Copy core files and components
  console.log(chalk.default.blue("Copying core files and components..."));
  fs.copySync(path.join(__dirname, "templates", "core"), path.join(projectPath, "src", "core"));
  fs.copySync(path.join(__dirname, "templates", "components"), path.join(projectPath, "src", "components"));

  console.log(chalk.default.green("Project setup complete!"));
  console.log(chalk.default.green(`Your project is ready at ${projectPath}.`));
  console.log(chalk.default.blue("To start the development server, run:"));
  console.log(chalk.default.blue(`cd ${answers.projectName} && npm run dev`));
});

program.parse(process.argv);