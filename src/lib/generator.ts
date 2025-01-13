import shell from "shelljs";
import { logger } from "./logger.js";

export const generator = {
  generateProject: async (answers: any) => {
    const spinner = logger.spinner("Creating project...").start();

    // Create the project with Vite
    const template = answers.language === "TypeScript" ? "react-ts" : "react";
    shell.exec(
      `npm create vite@latest ${answers.projectName} -- --template ${template}`,
      { cwd: answers.projectPath }
    );

    spinner.succeed("Project created successfully!");
  },
};