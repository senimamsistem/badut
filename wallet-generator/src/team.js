const chalk = require('chalk');

function displayHeader() {
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
  console.log(chalk.cyan('=           Wallet Generator          ='));
  console.log(chalk.cyan('=     Update by senimamsistem          ='));
  console.log(chalk.blue('----------------------------------------'));
  console.log();
}

module.exports = { displayHeader };