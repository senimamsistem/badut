import React, { useEffect, useState } from "react";
import { TimegraphClient } from "@analog-labs/timegraph-js";
import { web3Enable } from "@polkadot/extension-dapp";

const sessionKey = "#GANTI-SESION-AKUN"; // replace your_session_key with your session key
const timegraphGraphqlUrl = "https://timegraph.testnet.analog.one/graphql";

async function watchSDKTesting(
  setData,
  setAliasResponse,
  name,
  hashId,
  sponsorView
) {
  await web3Enable("abcd");

  const client = new TimegraphClient({
    url: timegraphGraphqlUrl,
    sessionKey: sessionKey,
  });

  let aliasResponse = await client.alias.add({
    name: name,
    hashId: hashId,
    identifier: name,
  });

  console.log(aliasResponse);
  setAliasResponse(aliasResponse);

  const data = await client.view.data({
    _name: name,
    hashId: hashId,
    fields: ["_index"],
    limit: 10,
  });

  setData(data);

  const fund = await client.tokenomics.sponsorView({
    viewName: name,
    amount: "2000000000",
  });

  sponsorView(fund);
}

function App() {
  const [data, setData] = useState(null);
  const [aliasResponse, setAliasResponse] = useState(null);
  const [name, setName] = useState("");
  const [hashId, setHashId] = useState("");
  const [fund, sponsorView] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    watchSDKTesting(setData, setAliasResponse, name, hashId, sponsorView, fund);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Analog - Query & Fund Unique View</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            View Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            View Hash ID:
            <input
              type="text"
              value={hashId}
              onChange={(e) => setHashId(e.target.value)}
              required
              style={styles.input}
            />
          </label>
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      {aliasResponse && (
        <div style={styles.result}>
          <h2 style={styles.subHeader}>Alias Response</h2>
          <pre style={styles.pre}>{JSON.stringify(aliasResponse, null, 2)}</pre>
        </div>
      )}

      {fund && (
        <div style={styles.result}>
          <h2 style={styles.subHeader}>Fund</h2>
          <pre style={styles.pre}>{JSON.stringify(fund, null, 2)}</pre>
        </div>
      )}

      {data ? (
        <div style={styles.result}>
          <h2 style={styles.subHeader}>Timegraph Data</h2>
          <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p style={styles.loadingText}>Loading data...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease",
  },
  header: {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "600",
  },
  form: {
    marginBottom: "25px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#7f8c8d",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #bdc3c7",
    fontSize: "16px",
    backgroundColor: "#ecf0f1",
    transition: "border 0.3s ease",
  },
  inputFocus: {
    borderColor: "#3498db",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
    transform: "scale(1.02)",
  },
  result: {
    marginBottom: "25px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    border: "1px solid #dce1e4",
    transition: "border 0.3s ease, box-shadow 0.3s ease",
  },
  subHeader: {
    color: "#2c3e50",
    marginBottom: "15px",
    fontSize: "22px",
    fontWeight: "600",
  },
  pre: {
    backgroundColor: "#ecf0f1",
    padding: "15px",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "14px",
    fontFamily: "'Courier New', monospace",
  },
  loadingText: {
    textAlign: "center",
    color: "#95a5a6",
    fontSize: "18px",
  },
  errorText: {
    textAlign: "center",
    color: "#e74c3c",
    fontSize: "18px",
    fontWeight: "500",
  },
};

// Example usage in JSX
<button
  style={styles.button}
  onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
  onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
>
  Submit
</button>

export default App;