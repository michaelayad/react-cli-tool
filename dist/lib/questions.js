var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import { resolvePath } from "../utils/pathUtils.js";
export const questions = {
    askProjectQuestions: () => __awaiter(void 0, void 0, void 0, function* () {
        const answers = yield inquirer.prompt([
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
                validate: (input) => {
                    if (!input)
                        return "Path is required!";
                    return true;
                },
            },
        ]);
        // Resolve the project path
        const projectPath = resolvePath(answers.projectPathType, answers.projectPath, answers.projectName);
        return Object.assign(Object.assign({}, answers), { projectPath });
    }),
};
