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
export const generator = {
    generateProject: (answers) => __awaiter(void 0, void 0, void 0, function* () {
        const spinner = logger.spinner("Creating project...").start();
        // Create the project with Vite
        const template = answers.language === "TypeScript" ? "react-ts" : "react";
        shell.exec(`npm create vite@latest ${answers.projectName} -- --template ${template}`, { cwd: answers.projectPath });
        spinner.succeed("Project created successfully!");
    }),
};
