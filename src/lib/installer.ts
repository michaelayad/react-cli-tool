import shell from "shelljs";
import { logger } from "./logger.js";

export const installer = {
  installDependencies: async (answers: any) => {
    const spinner = logger.spinner("Installing dependencies...").start();

    // Move into the project directory
    shell.cd(`${answers.projectPath}/${answers.projectName}`);

    // Install dependencies
    shell.exec("npm install", { silent: true }, (code) => {
      if (code === 0) {
        spinner.succeed("Dependencies installed successfully!");
      } else {
        spinner.fail("Failed to install dependencies.");
      }
    });
  },
};