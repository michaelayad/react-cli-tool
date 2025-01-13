import inquirer from "inquirer";
import { logger } from "./logger.js";
import { resolvePath } from "../utils/pathUtils.js";

export const questions = {
  askProjectQuestions: async () => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
        default: "my-react-app",
      },
      {
        type: "list",
        name: "language",
        message: "Would you like to use JavaScript or TypeScript?",
        choices: ["JavaScript", "TypeScript"],
      },
      {
        type: "list",
        name: "projectPathType",
        message: "Where should the project be created?",
        choices: [
          "Current directory",
          "Relative path (from current directory)",
          "Full path",
        ],
      },
      {
        type: "input",
        name: "projectPath",
        message: "Enter the path:",
        when: (answers) => answers.projectPathType !== "Current directory",
        validate: (input: string) => {
          if (!input) return "Path is required!";
          return true;
        },
      },
    ]);

    // Resolve the project path
    const projectPath = resolvePath(
      answers.projectPathType,
      answers.projectPath,
      answers.projectName
    );

    return {
      ...answers,
      projectPath,
    };
  },
};