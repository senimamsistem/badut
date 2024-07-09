const { ethers } = require('ethers');
const fs = require('fs').promises;
const readline = require('readline');
const chalk = require('chalk');
const bip39 = require('bip39');
const { displayHeader } = require('./src/team');

async function createWallet(wordCount = 12) {
  const mnemonic = bip39.generateMnemonic(wordCount === 24 ? 256 : 128);
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  return { address, privateKey, mnemonic };
}

async function main() {
  displayHeader();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const numWallets = await new Promise((resolve) => {
    rl.question('Berapa banyak wallet yang ingin Anda buat? ', (answer) => {
      resolve(parseInt(answer));
    });
  });

  const delaySeconds = await new Promise((resolve) => {
    rl.question('Delay (detik) antara setiap pembuatan wallet: ', (answer) => {
      resolve(parseFloat(answer) || 0.1);
    });
  });

  const wordCount = await new Promise((resolve) => {
    rl.question('Berapa banyak kata dalam mnemonic (12 atau 24)? ', (answer) => {
      resolve(parseInt(answer) === 24 ? 24 : 12);
    });
  });

  rl.close();

  for (let i = 0; i < numWallets; i++) {
    const { address, privateKey, mnemonic } = await createWallet(wordCount);
    const walletDetails = `Wallet ${i + 1}:\nAddress: ${address}\nPrivate Key: ${privateKey}\nMnemonic Phrase: ${mnemonic}\n\n`;
    
    console.log(chalk.blue(`Wallet ${i + 1}:`));
    console.log(chalk.white('Address: ') + chalk.gray(address));
    console.log(chalk.white('Private Key: ') + chalk.magenta(privateKey));
    console.log(chalk.white('Mnemonic Phrase: ') + chalk.green(mnemonic));
    console.log('\n');

    await fs.appendFile('wallet2.txt', walletDetails);

    if (address.startsWith('0x0000') || address.startsWith('0x00000') || address.startsWith('0x000000')) {
      await fs.appendFile('wallet_main.txt', walletDetails);
      console.log(chalk.red(`Dompet ditemukan dengan alamat berawalan '0x0000', '0x00000', atau '0x000000':\nAlamat: ${address}\nKunci Pribadi: ${privateKey}`));
    }

    if (address.startsWith('0x9999') || address.startsWith('0x99999')) {
      await fs.appendFile('wallet99.txt', walletDetails);
      console.log(chalk.yellow(`Dompet ditemukan dengan alamat berawalan '0x9999' atau '0x99999':\nAlamat: ${address}\nKunci Pribadi: ${privateKey}`));
    }

    await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
  }

  console.log(chalk.blue('Semua wallet telah ditulis ke wallet2.txt'));
}

main().catch(console.error);
