import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";
import boxen from "boxen";

export const logger = {
  showHeader: (text: string) => {
    console.log(
      chalk.blue(
        boxen(figlet.textSync(text, { horizontalLayout: "full" }), {
          padding: 1,
          borderColor: "blue",
        })
      )
    );
  },

  success: (message: string) => {
    console.log(chalk.green(`✔ ${message}`));
  },

  error: (message: string) => {
    console.log(chalk.red(`✖ ${message}`));
  },

  info: (message: string) => {
    console.log(chalk.blue(`ℹ ${message}`));
  },

  spinner: (message: string) => {
    return ora(message);
  },
};