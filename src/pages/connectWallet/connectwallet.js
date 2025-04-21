import react from 'react';
import { useState } from 'react';


function ConnectWallet() {
    const [walletAddress, setWalletAddress] = useState('');
    const [WalletBalance, setWalletBalance] = useState('');
    const connectWallet = async () => {
        //window.ethereum is injected by MetaMask in chrome when installed
        if (typeof window.ethereum !== 'undefined') {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const account = accounts[0];
            setWalletAddress(account);
            const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [account, 'latest'],
              });
      
              // Convert balance from Wei to ETH
              const ethBalance = parseFloat(window.ethereum.utils?.fromWei?.(balance, 'ether') || (Number(balance) / 1e18)).toFixed(4);
              setWalletBalance(ethBalance);
            } catch (error) {
              console.error("Connection error:", error);
            }
        } else {
          alert('MetaMask is not installed. Please install it to connect.');
        }
      };
     
    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <h1>Connect Your Wallet</h1>
            <button className="connect-button" onClick={connectWallet}>Connect Wallet</button>
            <p>
                {walletAddress}
            </p>
            <p> The Current Balance is <span>{WalletBalance}</span></p>
        </div>
    );
}
export default ConnectWallet;