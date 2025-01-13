import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";
import boxen from "boxen";
export const logger = {
    showHeader: (text) => {
        console.log(chalk.blue(boxen(figlet.textSync(text, { horizontalLayout: "full" }), {
            padding: 1,
            borderColor: "blue",
        })));
    },
    success: (message) => {
        console.log(chalk.green(`✔ ${message}`));
    },
    error: (message) => {
        console.log(chalk.red(`✖ ${message}`));
    },
    info: (message) => {
        console.log(chalk.blue(`ℹ ${message}`));
    },
    spinner: (message) => {
        return ora(message);
    },
};
