import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import getContract from '../../utils/getContract.js';
import { useTheme } from '../../context/ThemeContext.js';

function ConnectWallet() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  // const [walletBalance, setWalletBalance] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
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
    errorMessage= "Connect wallet please";
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
      
      if (error.code === 4001) {
    setErrorMessage("🛑 Transaction rejected by user.");
      } else if (error.message.includes('revert')) {
        errorMessage = "Transfer failed. Make sure you have sufficient tokens.";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds in the wallet.";
      }
  
      setErrorMessage(errorMessage);
    }
  };

  const ApproveIt = async (spender, value) => {
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
      const gas = await contract.methods.approve(spender, valueInWei).estimateGas({ from: user });
  
      //Approve transaction
      await contract.methods
        .approve(spender, valueInWei);
  
      console.log("✅ Tokens approved successfully!");
    } catch (error) {
      console.error("Transfer error:", error);
      let errorMessage = error.message;
      
      if (error.code === 4001) {
    setErrorMessage("🛑 Transaction rejected by user.");
      } else if (error.message.includes('revert')) {
        errorMessage = "Transfer failed. Make sure you have sufficient tokens.";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds in the wallet.";
      }
  
      setErrorMessage(errorMessage);
    }
  };
  
  const mint = async (value) => {
    setErrorMessage('');
  
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const user = accounts[0];
  
      const contract = await getContract(); // assume you already have this
  
      // Convert value to smallest unit (e.g., if value = 10 USDT, then it's 10 * 10^18)
      const valueInWei = web3.utils.toWei(value.toString(), 'ether'); // hardcoded to 18 decimals
  
      // Estimate gas and call mint
      const gas = await contract.methods.mint(valueInWei).estimateGas({ from: user });
  
      await contract.methods.mint(valueInWei).send({ from: user, gas });
  
      console.log("✅ Minted successfully!");
    } catch (error) {
      console.error("Minting error:", error);
      let errorMessage = error.message;
  
      if (error.code === 4001) {
        errorMessage = "Transaction rejected by user.";
      } else if (error.message.includes('revert')) {
        errorMessage = "Mint failed. You might not have permission.";
      }
  
      setErrorMessage(errorMessage);
    }
  };
  

  const recipientAddress = "0x753ca43550cb67C48C7c89eea3928D5f15492723"; 
const amountToTransfer = "10000";
  return (
   

<div className={`app ${theme}`} style={{height:"100vh"}}>
      <h1 style={{margin:"0px"}}>Welcome to {theme === 'light' ? 'Light' : 'Dark'} Mode</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
   
   
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Connect Your Wallet</h1>
      <button onClick={connectWallet}>Connect Wallet</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <p>{walletAddress && `Wallet Address: ${walletAddress}`}</p>
      {/* <p>{walletBalance && `The Current ETH Balance is: ${walletBalance}`}</p> */}
      <p style={{fontWeight:"700"}}>{tokenBalance && `The Current Token Balance is: ${tokenBalance} ${tokenSymbol}`}</p>
<div style={{display:"flex", gap:"20px"}}>
      {/* <button onClick={sendMoney}>Send Money</button> */}
      <button onClick={() => transferTokens(recipientAddress, amountToTransfer)}> Transfer USDT </button>
      </div>

      <button onClick={()=>mint(0.00001)} style={{marginTop:"20px"}}>Mint </button>

      <button  style={{marginTop:"20px" , background:"Green", border:"none"}} onClick={()=>{ApproveIt(recipientAddress,amountToTransfer)}}>Approvee </button>
    </div>
    </div>
  );
}
export default ConnectWallet;
