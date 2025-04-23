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
  
      // const ShowBalance = await contract.methods.balanceOf(walletAddress).call();
      // console.log(`wallet Contract here it is Balance: ${ShowBalance}`);

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
  const sendMoney = () => {
    navigate('/sendmoney');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Connect Your Wallet</h1>
      <button onClick={connectWallet}>Connect Wallet</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <p>{walletAddress && `Wallet Address: ${walletAddress}`}</p>
      <p>{walletBalance && `The Current ETH Balance is: ${walletBalance}`}</p>
      <p>{tokenBalance && `The Current Token Balance is: ${tokenBalance}`}</p>

      <button onClick={sendMoney}>Send Money</button>
    </div>
  );
}

export default ConnectWallet;
