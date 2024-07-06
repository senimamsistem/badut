const fs = require('fs');
const { createReceiveAddress } = require('./createReceiveAddress');

async function getRecipientAddress(prefix, requiredCount, chainName) {
  let recipients = [];
  const fileName = `recipients/${chainName}-list-address.js`;
  try {
    recipients = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    console.log(`Loaded recipients from ${fileName}`);
  } catch (error) {
    console.log(`No ${fileName} file or file is empty, generating new addresses...`.red);
  }
  recipients = recipients.filter(address => address.startsWith(prefix));
  while (recipients.length < requiredCount) {
    const newAddress = await createReceiveAddress(prefix);
    recipients.push(newAddress);
  }
  return recipients.slice(0, requiredCount);
}

module.exports = { getRecipientAddress };
