const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { SigningStargateClient, GasPrice, coins } = require('@cosmjs/stargate');

const rpcEndpoint = 'https://lcd.osmotest5.osmosis.zone';
const prefix = 'osmo';
const gasPrice = GasPrice.fromString('0.025uosmo');
const denom = 'uosmo';
const explorerUrl = 'https://testnet.osmosis.explorers.guru';

async function createWallet(mnemonic) {
  return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
}

async function connectClient(wallet) {
  return await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice });
}

module.exports = { createWallet, connectClient, prefix, gasPrice, rpcEndpoint, denom, explorerUrl };
