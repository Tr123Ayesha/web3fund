import Web3 from "web3";
import stakeTokenAbi from "./contract/stakeTokenabi.json";
import { StakeToken } from "./contract/contractAddress.js";

const BSC_TESTNET_CHAIN_ID = '0x61';
const BSC_TESTNET_PARAMS = {
  chainId: BSC_TESTNET_CHAIN_ID,
  chainName: "Binance Smart Chain Testnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
  blockExplorerUrls: ["https://testnet.bscscan.com"]
};

const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  // Handle network switching more robustly
  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    if (chainId !== BSC_TESTNET_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BSC_TESTNET_CHAIN_ID }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [BSC_TESTNET_PARAMS],
            });
          } catch (addError) {
            throw new Error("Could not add BSC Testnet to MetaMask");
          }
        } else {
          throw new Error("Failed to switch to BSC Testnet");
        }
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    throw new Error("Network configuration failed");
  }

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);
  
  return new web3.eth.Contract(stakeTokenAbi, StakeToken);
};

export default getContract;