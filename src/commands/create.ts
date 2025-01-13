import { logger } from "../lib/logger.js";
import { questions } from "../lib/questions.js";
import { generator } from "../lib/generator.js";
import { installer } from "../lib/installer.js";

export const createCommand = async () => {
  try {
    // Prompt the user for input
    const answers = await questions.askProjectQuestions();

    // Generate the project
    await generator.generateProject(answers);

    // Install dependencies
    await installer.installDependencies(answers);

    // Display success message
    logger.success(`Project "${answers.projectName}" created successfully!`);
    logger.info(`To start the development server, run:`);
    logger.info(`cd ${answers.projectPath} && npm run dev`);
  } catch (error: any) {
    logger.error(`Failed to create project: ${error.message}`);
  }
};
