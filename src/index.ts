#!/usr/bin/env node
import { program } from "commander";
import { createCommand } from "./commands/create.js";
import { logger } from "./lib/logger.js";

// Display a beautiful header
logger.showHeader("React CLI - Michael");

// Define the CLI
program
  .version("1.0.0")
  .description("A beautiful CLI tool to generate React projects with Vite");

// Add the "create" command
program
  .command("create")
  .description("Create a new React project")
  .action(createCommand);

// Parse CLI arguments
program.parse(process.argv);