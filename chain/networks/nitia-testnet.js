const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { SigningStargateClient, GasPrice, coins } = require('@cosmjs/stargate');

const rpcEndpoint = 'https://initia-testnet.rpc.kjnodes.com';
const prefix = 'init';
const gasPrice = GasPrice.fromString('0.06ugas');
const denom = 'uinit';
const feeDenom = 'ugas'; // Token yang digunakan untuk biaya transaksi
const explorerUrl = 'https://scan.testnet.initia.xyz/initiation-1/txs/';

async function createWallet(mnemonic) {
  return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
}

async function createWalletFromPrivateKey(privateKey) {
  return await DirectSecp256k1Wallet.fromKey(Buffer.from(privateKey, 'hex'), prefix);
}

async function connectClient(wallet) {
  return await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice });
}

module.exports = { createWallet, createWalletFromPrivateKey, connectClient, prefix, gasPrice, rpcEndpoint, denom, feeDenom, explorerUrl };
