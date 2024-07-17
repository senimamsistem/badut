// src/logo.js
import chalk from 'chalk';

export function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log(chalk.blue('----------------------------------------'));
  console.log(chalk.cyan(`
    █████╗ ██████╗ ████████╗████████╗███████╗ █████╗ ███╗   ███╗
   ██╔══██╗██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
   ███████║██████╔╝   ██║█████╗██║   █████╗  ███████║██╔████╔██║
   ██╔══██║██╔══██╗   ██║╚════╝██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
   ██║  ██║██║  ██║   ██║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║
   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
  `));
  console.log(chalk.cyan('=           Analog                     ='));
  console.log(chalk.cyan('=     Update by senimamsistem          ='));
  console.log(chalk.blue('========================================'));
  console.log();
}
