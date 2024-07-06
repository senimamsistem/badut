const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { SigningStargateClient, GasPrice, coins } = require('@cosmjs/stargate');

const rpcEndpoint = 'https://nillion-testnet-rpc.polkachu.com';
const prefix = 'nillion';
const gasPrice = GasPrice.fromString('0.025unil');
const denom = 'unil';
const explorerUrl = 'https://testnet.nillion.explorers.guru';

async function createWallet(mnemonic) {
  return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
}

async function createWalletFromPrivateKey(privateKey) {
  return await DirectSecp256k1Wallet.fromKey(Buffer.from(privateKey, 'hex'), prefix);
}

async function connectClient(wallet) {
  return await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice });
}

module.exports = { createWallet, createWalletFromPrivateKey, connectClient, prefix, gasPrice, rpcEndpoint, denom, explorerUrl };
