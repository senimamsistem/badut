const { coins, assertIsDeliverTxSuccess } = require('@cosmjs/stargate');
const { getRecipientAddress } = require('./getRecipientAddress');
const { getRandomAmount } = require('./utils');
require('colors').config;

async function checkBalance(client, address, denom) {
  const balance = await client.getBalance(address, denom);
  return balance.amount;
}

async function sendTransaction(wallet, chainConfig, amountInTokens, txCount, chainName, minAmount, maxAmount) {
  const client = await chainConfig.connectClient(wallet);

  const recipients = await getRecipientAddress(chainConfig.prefix, txCount, chainName);
  const [firstAccount] = await wallet.getAccounts();
  const balance = await checkBalance(client, firstAccount.address, chainConfig.denom);
  const estimatedFee = 2000;

  if (amountInTokens === 0) {
    const amountInMicroTokens = balance - estimatedFee;
    if (amountInMicroTokens <= 0) {
      console.log(`Saldo akun ${firstAccount.address} tidak mencukupi untuk menutupi biaya transaksi.`.red);
      return;
    }
    const amount = coins(amountInMicroTokens, chainConfig.denom);
    console.log(`Send ${amountInMicroTokens / 1000000} ${chainConfig.denom.toUpperCase()} to`.yellow, recipients[0]);
    const transaction = await client.sendTokens(
      firstAccount.address,
      recipients[0],
      amount,
      'auto'
    );
    assertIsDeliverTxSuccess(transaction);
    const transactionHash = transaction.transactionHash;
    const transactionURL = `${chainConfig.explorerUrl}/transaction/${transactionHash}`;
    const gasUsed = transaction.gasUsed;
    const newBalance = await checkBalance(client, firstAccount.address, chainConfig.denom);
    console.log(`Successfully broadcasted:`.green);
    console.log(`  Transaction URL:`.magenta, transactionURL.blue);
    console.log(`  Sender Address:`.magenta, firstAccount.address);
    console.log(`  Gas Used:`.magenta, gasUsed);
    console.log(`  New Balance:`.magenta, `${newBalance / 1000000} ${chainConfig.denom.toUpperCase()}`);
  } else {
    for (let i = 0; i < txCount; i++) {
      const recipient = recipients[i];
      let amountToSend = amountInTokens;
      if (minAmount !== undefined && maxAmount !== undefined) {
        amountToSend = getRandomAmount(minAmount, maxAmount);
      }
      const amountInMicroTokens = Math.floor(amountToSend * 1000000); 
      const amount = coins(amountInMicroTokens, chainConfig.denom);

      if (balance < amountInMicroTokens + estimatedFee) {
        console.log(`Saldo akun ${firstAccount.address} tidak mencukupi untuk mengirim ${amountToSend} ${chainConfig.denom.toUpperCase()} dan menutupi biaya transaksi.`.red);
        return;
      }

      console.log(`Send ${amountToSend} ${chainConfig.denom.toUpperCase()} to`.yellow, recipient);
      const transaction = await client.sendTokens(
        firstAccount.address,
        recipient,
        amount,
        'auto'
      );
      assertIsDeliverTxSuccess(transaction);
      const transactionHash = transaction.transactionHash;
      const transactionURL = `${chainConfig.explorerUrl}/transaction/${transactionHash}`;
      const gasUsed = transaction.gasUsed;
      const newBalance = await checkBalance(client, firstAccount.address, chainConfig.denom);
      console.log(`Successfully broadcasted:`.green);
      console.log(`  Transaction URL:`.white, transactionURL.blue);
      console.log(`  Sender Address:`.white, firstAccount.address);
      console.log(`  Gas Used:`.white, gasUsed);
      console.log(`  New Balance:`.white, `${newBalance / 1000000} ${chainConfig.denom.toUpperCase()}`.brightGreen);
    }
  }
}

module.exports = { sendTransaction };
