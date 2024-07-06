require('colors').config;
const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');
const { sleep } = require('./src/sleep');
const { initWalletsFromMnemonic, initWalletsFromPrivateKey } = require('./src/initWallets');
const { sendTransaction } = require('./src/sendTransaction');
const { getRandomAmount } = require('./src/utils');

(async () => {
  process.stdout.write('\x1Bc');
  console.log(
    `
    █████╗ ██████╗ ████████╗████████╗███████╗ █████╗ ███╗   ███╗
    ██╔══██╗██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
    ███████║██████╔╝   ██║█████╗██║   █████╗  ███████║██╔████╔██║
    ██╔══██║██╔══██╗   ██║╚════╝██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
    ██║  ██║██║  ██║   ██║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
  `.cyan
  );
  console.log('     Update by senimamsistem'.magenta);
  console.log();

  // List available chains
  const networksDir = path.join(__dirname, 'networks');
  const chains = fs.readdirSync(networksDir).filter(file => file.endsWith('.js')).map(file => file.replace('.js', ''));

  if (chains.length === 0) {
    console.error('No chains available. Please add chain configuration files in the networks directory.');
    return;
  }

  console.log('Available chains:'.bold.blue);
  chains.forEach((chain, index) => {
    console.log(`  ${index + 1}. ${chain}`);
  });

  console.log('\n──────────────────────────────────────────────────────────\n'.gray);

  const chainChoiceIndex = parseInt(
    readlineSync.question('Choose chain by number: '.yellow),
    10
  ) - 1;

  if (chainChoiceIndex < 0 || chainChoiceIndex >= chains.length) {
    console.error('Invalid choice. Exiting...'.red);
    return;
  }

  const chainChoice = chains[chainChoiceIndex];
  const chainConfig = require(`./networks/${chainChoice}`);

  console.log('\n──────────────────────────────────────────────────────────\n'.gray);

  console.log('Choose wallet initialization method'.bold.blue);
  console.log('  0. Enter 0 for mnemonic');
  console.log('  1. Enter 1 for private key');

  const walletChoice = parseInt(
    readlineSync.question('\nYour choice: '.yellow),
    10
  );

  let wallets;
  if (walletChoice === 0) {
    wallets = await initWalletsFromMnemonic(chainConfig);
  } else if (walletChoice === 1) {
    wallets = await initWalletsFromPrivateKey(chainConfig);
  } else {
    console.error('Invalid choice. Exiting...'.red);
    return;
  }

  console.log('\n──────────────────────────────────────────────────────────\n'.gray);

  const txCount = parseInt(
    readlineSync.question('How many transactions do you want to send? '.yellow),
    10
  );

  console.log('Enter the amount of tokens to send per transaction:');
  console.log('  0. Enter 0 to send all tokens');
  console.log('  1. Enter 1 to send random amount');
  console.log('  2. Enter 2 to send & set amount');

  const amountChoice = parseInt(
    readlineSync.question('\nYour choice: '.yellow),
    10
  );

  let amountInTokens;
  let minAmount, maxAmount;

  if (amountChoice === 0) {
    amountInTokens = 0;
  } else if (amountChoice === 1) {
    minAmount = parseFloat(
      readlineSync.question('Enter the minimum amount of tokens to send: '.yellow)
    );
    maxAmount = parseFloat(
      readlineSync.question('Enter the maximum amount of tokens to send: '.yellow)
    );
  } else if (amountChoice === 2) {
    amountInTokens = parseFloat(
      readlineSync.question('Enter the amount of tokens to send: '.yellow)
    );
  } else {
    console.error('Invalid choice. Exiting...'.red);
    return;
  }

  console.log('\n──────────────────────────────────────────────────────────\n'.gray);

  for (const wallet of wallets) {
    await sendTransaction(wallet, chainConfig, amountInTokens, txCount, chainChoice, minAmount, maxAmount);
  }

  console.log('All transactions are done!'.green);
})();
