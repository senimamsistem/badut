const fs = require('fs');

async function initWalletsFromMnemonic(chainConfig) {
  const mnemonics = JSON.parse(fs.readFileSync('accounts.json', 'utf8'));
  const wallets = [];
  for (const mnemonic of mnemonics) {
    const wallet = await chainConfig.createWallet(mnemonic);
    wallets.push(wallet);
  }
  return wallets;
}

async function initWalletsFromPrivateKey(chainConfig) {
  const privateKeys = JSON.parse(fs.readFileSync('privateKeys.json', 'utf8'));
  const wallets = [];
  for (const privateKey of privateKeys) {
    const wallet = await chainConfig.createWalletFromPrivateKey(privateKey);
    wallets.push(wallet);
  }
  return wallets;
}

module.exports = { initWalletsFromMnemonic, initWalletsFromPrivateKey };
