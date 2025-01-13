var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import shell from "shelljs";
import { logger } from "./logger.js";
export const installer = {
    installDependencies: (answers) => __awaiter(void 0, void 0, void 0, function* () {
        const spinner = logger.spinner("Installing dependencies...").start();
        // Move into the project directory
        shell.cd(`${answers.projectPath}/${answers.projectName}`);
        // Install dependencies
        shell.exec("npm install", { silent: true }, (code) => {
            if (code === 0) {
                spinner.succeed("Dependencies installed successfully!");
            }
            else {
                spinner.fail("Failed to install dependencies.");
            }
        });
    }),
};
