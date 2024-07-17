import inquirer from 'inquirer';
import { executeQuery } from './src/view.js';
import { executeQueryAndFund } from './src/fund.js';
import { displayHeader } from './src/logo.js';
import { wallets, setWalletConfig } from './src/config.js';
import fs from 'fs/promises';

async function promptUser() {
    const { selectedWalletName } = await inquirer.prompt({
        type: 'list',
        name: 'selectedWalletName',
        message: 'Choose a wallet to use:',
        choices: wallets.map(wallet => wallet.name)
    });

    const selectedWallet = wallets.find(wallet => wallet.name === selectedWalletName);
    setWalletConfig(selectedWallet);

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Do you want to run queries from file or manually?',
        choices: ['From file', 'Manually']
    });

    if (option === 'From file') {
        try {
            const data = await fs.readFile('all-query.json', 'utf8');
            const queries = JSON.parse(data);
            for (const query of queries) {
                await executeQuery(query.hashId, query.name);
            }
        } catch (error) {
            console.error('Error reading or parsing file all-query.json:', error);
        }
    } else if (option === 'Manually') {
        const { viewOption } = await inquirer.prompt({
            type: 'list',
            name: 'viewOption',
            message: 'Do you want to execute Only View or View & Fund?',
            choices: ['Only View', 'View & Fund']
        });

        const { hashId } = await inquirer.prompt({
            type: 'input',
            name: 'hashId',
            message: 'Enter HashId:'
        });

        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter Name:'
        });

        const formattedHashId = hashId.includes('watch.testnet.analog.one/#/view/') ? hashId.split('/').pop() : hashId;

        if (viewOption === 'Only View') {
            await executeQuery(formattedHashId, name);
        } else if (viewOption === 'View & Fund') {
            const { amount } = await inquirer.prompt({
                type: 'input',
                name: 'amount',
                message: 'Enter amount to fund (in ANLOG):'
            });

            await executeQueryAndFund(formattedHashId, name, amount);
        }
    }
}

async function main() {
    displayHeader();
    await promptUser();
}

main();
