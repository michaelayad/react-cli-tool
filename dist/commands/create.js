var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logger } from "../lib/logger.js";
import { questions } from "../lib/questions.js";
import { generator } from "../lib/generator.js";
import { installer } from "../lib/installer.js";
export const createCommand = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Prompt the user for input
        const answers = yield questions.askProjectQuestions();
        // Generate the project
        yield generator.generateProject(answers);
        // Install dependencies
        yield installer.installDependencies(answers);
        // Display success message
        logger.success(`Project "${answers.projectName}" created successfully!`);
        logger.info(`To start the development server, run:`);
        logger.info(`cd ${answers.projectPath} && npm run dev`);
    }
    catch (error) {
        logger.error(`Failed to create project: ${error.message}`);
    }
});
