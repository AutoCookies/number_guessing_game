#!/usr/bin/env node
process.title = "number-guessing-game-cli";

import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import { playGame } from "./utils/game.js";

console.log(chalk.cyan(figlet.textSync("Number Guessing Game")));

const program = new Command();

program
    .name("number-guessing-game")
    .description("An enhanced number guessing game with multiple difficulty levels and fun features!")
    .version("1.1.0");

program
    .command("easy")
    .description("Easy mode (10 attempts)")
    .action(() => playGame(10, "Easy"));

program
    .command("medium")
    .description("Medium mode (5 attempts)")
    .action(() => playGame(5, "Medium"));

program
    .command("hard")
    .description("Hard mode (3 attempts)")
    .action(() => playGame(3, "Hard"));

program
    .command("challenge")
    .description("Challenge mode (5 attempts + 30s time limit)")
    .action(() => playGame(5, "Challenge", true));

program.parse(process.argv);