const { DirectSecp256k1HdWallet, DirectSecp256k1Wallet } = require('@cosmjs/proto-signing');
const { SigningStargateClient, GasPrice, coins } = require('@cosmjs/stargate');

const rpcEndpoint = 'https://warden-testnet.rpc.kjnodes.com';
const prefix = 'warden';
const gasPrice = GasPrice.fromString('0.025uward');
const denom = 'uward';
const explorerUrl = 'https://testnet.warden.explorers.guru';

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
