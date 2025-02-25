import readline from "readline";
import chalk from "chalk";
import player from "play-sound";

const sound = player();

let bestScore = Infinity;

export function playGame(maxAttempts, mode, isChallenge = false) {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let startTime = Date.now();
    const timeLimit = 30000; // 30 seconds for challenge mode

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(chalk.yellowBright(`🎮 Welcome to ${mode} Mode!`));
    console.log(chalk.magenta(`Try to guess the number between 1 and 100.`));
    console.log(chalk.blueBright(`You have ${maxAttempts} attempts.`));

    function askQuestion() {
        if (isChallenge && Date.now() - startTime > timeLimit) {
            console.log(chalk.redBright(`⏳ Time's up! You lost. The number was ${secretNumber}.`));
            sound.play("fail.mp3"); // Play failure sound
            return playAgain();
        }

        if (attempts >= maxAttempts) {
            console.log(chalk.redBright(`❌ You lost! The secret number was ${secretNumber}.`));
            sound.play("fail.mp3"); // Play failure sound
            return playAgain();
        }

        rl.question(chalk.cyan("Enter your guess: "), (input) => {
            let number = parseInt(input, 10);

            if (isNaN(number) || number < 1 || number > 100) {
                console.log(chalk.red("⚠️ Invalid input! Enter a number between 1 and 100."));
            } else {
                attempts++;

                if (number === secretNumber) {
                    let timeTaken = (Date.now() - startTime) / 1000;
                    console.log(chalk.greenBright(`🎉 Congratulations! You guessed it in ${attempts} attempts.`));
                    console.log(chalk.yellow(`⏳ Time taken: ${timeTaken.toFixed(2)}s`));
                    sound.play("win.mp3"); // Play success sound

                    if (attempts < bestScore) {
                        bestScore = attempts;
                        console.log(chalk.greenBright(`🏆 New Best Score: ${bestScore} attempts!`));
                    }

                    return playAgain();
                } else if (number < secretNumber) {
                    console.log(chalk.blueBright(`🔽 Too low! ${maxAttempts - attempts} attempts left.`));
                } else {
                    console.log(chalk.yellowBright(`🔼 Too high! ${maxAttempts - attempts} attempts left.`));
                }
            }

            askQuestion();
        });
    }

    function playAgain() {
        rl.question(chalk.magentaBright("\n🔁 Do you want to play again? (yes/no): "), (answer) => {
            if (answer.toLowerCase() === "yes") {
                playGame(maxAttempts, mode, isChallenge);
            } else {
                console.log(chalk.greenBright("Thanks for playing! Goodbye! 👋"));
                rl.close();
            }
        });
    }

    askQuestion();
}
