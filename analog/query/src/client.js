// src/client.js
import { TimegraphClient } from "@analog-labs/timegraph-js";
import { new_cert, build_apikey, encode_ssk, build_ssk } from "@analog-labs/timegraph-wasm";
import { Keyring } from "@polkadot/keyring";
import { walletConfig } from './config.js';

export async function createTimegraphClient() {
    await waitReady();
    const keyring = new Keyring({ type: "sr25519" });
    const account = walletConfig;
    const keyPair = keyring.addFromUri(account.phrase);
    let [cert_data, secret] = new_cert(account.addr, "developer");
    const signature = keyPair.sign(cert_data);
    const key = build_apikey(secret, cert_data, signature);

    const ssk_data = encode_ssk({
        ns: 0,
        key: account.addr,
        user_id: 1,
        expiration: 0,
    });

    const ssk_signature = keyPair.sign(ssk_data);
    const ssk = build_ssk(ssk_data, ssk_signature);

    return new TimegraphClient({
        url: "https://timegraph.testnet.analog.one/graphql",
        sessionKey: ssk,
    });
}
