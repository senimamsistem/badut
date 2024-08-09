// src/config.js
export const wallets = [
    {
        name: "NAMA-WALLET",
        addr: "ADDRES",
        phrase: "#PHASE"
    }
];

export let walletConfig = {};

export function setWalletConfig(selectedWallet) {
    walletConfig = selectedWallet;
}
