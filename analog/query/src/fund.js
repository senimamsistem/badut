import { TimegraphClient } from "@analog-labs/timegraph-js";
import { new_cert, build_apikey, encode_ssk, build_ssk } from "@analog-labs/timegraph-wasm";
import { Keyring } from "@polkadot/keyring";
import { waitReady } from "@polkadot/wasm-crypto";
import { walletConfig } from './config.js';
import { extractFieldsFromSQL, convertToTOCKBaseUnits } from './utils.js';

export async function executeQueryAndFund(hashId, name, amount) {
    await waitReady();
    const keyring = new Keyring({ type: "sr25519" });

    try {
        const keyPair = keyring.addFromUri(walletConfig.phrase);
        let [cert_data, secret] = new_cert(walletConfig.addr, "developer");
        const signature = keyPair.sign(cert_data);
        const key = build_apikey(secret, cert_data, signature);

        const ssk_data = encode_ssk({
            ns: 0,
            key: walletConfig.addr,
            user_id: 1,
            expiration: 0,
        });

        const ssk_signature = keyPair.sign(ssk_data);
        const ssk = build_ssk(ssk_data, ssk_signature);

        const client = new TimegraphClient({
            url: "https://timegraph.testnet.analog.one/graphql",
            sessionKey: ssk,
        });

        const response1 = await client.alias.add({
            hashId: hashId, 
            name: name,
        });
        console.log(` `);
        console.log(`Querying       : \x1b[33m${walletConfig.addr}\x1b[0m`);
        console.log(`Status         : ${response1.status}`);
        console.log(`Function       : ${response1.function || "None"}`);
        console.log(` `);
        console.log(`[View Details]`);
        console.log(`Hash ID        : ${response1.view.hashId}`);
        console.log(`Name           : ${response1.view.name}`);
        console.log(`Description    : ${response1.view.description || "No description available"}`);
        console.log(`Identifier     : ${response1.view.identifier}`);
        console.log(`SQL            : ${response1.view.sql}`);
        console.log(` `);
        console.log(`Creator        : \x1b[32m$${response1.view.creator}\x1b[0m`);
        console.log(`References     : ${response1.view.references.length} reference(s)`);
        console.log(` `);

        const sql = response1.view.sql;
        const fieldSets = [extractFieldsFromSQL(sql)];

        let response2;
        for (let fields of fieldSets) {
            try {
                response2 = await client.view.data({
                    hashId: hashId,
                    fields: fields,
                    limit: "10",
                });
                console.log(`\x1b[31mData view for account ${walletConfig.addr} with fields ${fields.join(', ')}:\x1b[0m`);
                console.table(response2);
                if (response2 && response2.length > 0) {
                    break; 
                }
            } catch (error) {
                console.error(`Error with fields ${fields.join(", ")}:`, error);
            }
        }

        const amountInBaseUnits = convertToTOCKBaseUnits(amount);

        const fundResponse = await client.tokenomics.sponsorView({
            viewName: name,
            amount: amountInBaseUnits
        });

        console.log('Funding Response:', fundResponse);
        console.log(`Status: ${fundResponse.status}`);
        console.log(`Transaction ID: ${fundResponse.transactionId || 'Not available'}`);
        console.log(`Funded: ${fundResponse.amount}`);
        console.log(`Funded At: ${new Date().toISOString()}`);
        console.log(`Sponsor: ${walletConfig.addr}`);
    } catch (error) {
        console.error(`Error processing account ${walletConfig.addr}`, error);
    }
}
