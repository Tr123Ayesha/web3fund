import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import getContract from '../../utils/getContract.js';

function ConnectWallet() {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [tokenSymbol, setTokenSymbol] = useState('');

  const connectWallet = async () => {
    setErrorMessage('');
    setTokenBalance('');
  
    try {
      const contract = await getContract();
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      setWalletAddress(accounts[0]);
  
      // Get token decimals for proper formatting
      const decimals = await contract.methods.decimals().call();
      const rawBalance = await contract.methods.balanceOf(accounts[0]).call();
      
      // Convert balance to proper decimal format
      const formattedBalance = Web3.utils.fromWei(rawBalance, 'ether');
      setTokenBalance(formattedBalance);
  
     
      const symbol = await contract.methods.symbol().call();
      console.log(`Balance: ${formattedBalance} ${symbol}`);
      setTokenSymbol(symbol);
    } catch (error) {
      console.error("Connection error:", error);
     let errorMessage = error.message;
      if (error.code === 4001) {
        errorMessage = "Please connect your wallet to continue";
      } else if (error.message.includes('revert')) {
        errorMessage = "Transaction reverted. Contract may be paused or not initialized.";
      }
      
      setErrorMessage(errorMessage);
    }
  };

  const transferTokens = async (to, value) => {
    setErrorMessage(''); // Clear any previous error
  
    try {
      // Initialize Web3 instance
      const web3 = new Web3(window.ethereum); // Initialize Web3
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const user = accounts[0];
      setWalletAddress(user);
  
      // Load contract (make sure getContract() returns a valid contract)
      const contract = await getContract(); // Ensure this is returning the correct contract instance
      
     
  
      const valueInWei = web3.utils.toWei(value.toString(), 'ether');
      const gas = await contract.methods.transfer(to, valueInWei).estimateGas({ from: user });
  
      // Send the transfer transaction
      await contract.methods
        .transfer(to, valueInWei) // Transfer the tokens
        .send({ from: user, gas });
  
      console.log("✅ Tokens transferred successfully!");
    } catch (error) {
      console.error("Transfer error:", error);
      let errorMessage = error.message;
      
      // Handle different error types
      if (error.code === 4001) {
        errorMessage = "Transaction rejected by user.";
      } else if (error.message.includes('revert')) {
        errorMessage = "Transfer failed. Make sure you have sufficient tokens.";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds in the wallet.";
      }
  
      setErrorMessage(errorMessage);
    }
  };
  
  

  const sendMoney = () => {
    navigate('/sendmoney');
  };
  const recipientAddress = "0x5edBf4B846CA94AcDf1CC62114b6118Af6D4E047"; 
const amountToTransfer = "3"; 



  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Connect Your Wallet</h1>
      <button onClick={connectWallet}>Connect Wallet</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <p>{walletAddress && `Wallet Address: ${walletAddress}`}</p>
      {/* <p>{walletBalance && `The Current ETH Balance is: ${walletBalance}`}</p> */}
      <p>{tokenBalance && `The Current Token Balance is: ${tokenBalance} USDT`}</p>
<div style={{display:"flex", gap:"20px"}}>
      <button onClick={sendMoney}>Send Money</button>
      <button onClick={() => transferTokens(recipientAddress, amountToTransfer)}> Transfer USDT </button>
      </div>
    </div>
  );
}

export default ConnectWallet;
