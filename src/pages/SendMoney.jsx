import React, { useState } from "react";

function SendMoney() {
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");

  const sendTransaction = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found. Please install it.");
      return;
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const from = accounts[0];

    const tx = {
      from: from,
      to: toAddress,
      value: `0x${(Number(amount) * 1e18).toString(16)}`, // convert ETH to hex Wei
    };

    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });
      alert(`Transaction sent! Hash: ${txHash}`);
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Transaction failed. See console.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "50px" }}>
      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        style={{ width: "300px", height: "40px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "300px", height: "40px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button onClick={sendTransaction} style={{ padding: "10px 20px", marginTop: "10px" }}>
        Send ETH
      </button>
    </div>
  );
}

export default SendMoney;
