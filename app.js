import { createWalletClient, createPublicClient, custom, defineChain } from 'https://esm.sh/viem';

let publicClient;
let walletClient;
let account;
let chain;

// Replace with your deployed contract address
const contractAddress = "0x52fBee8E482CaFC3E4043C1286ffc0aafbfc1E82";

const contractABI = [
    {
      "inputs": [],
      "name": "getData",
      "outputs": [
        {
          "internalType": "string",
          "name": "outPutMesage",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "messageData",
          "type": "string"
        }
      ],
      "name": "storeData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

async function connectToMetamask() {
  if (typeof window.ethereum === "undefined") {
    return alert("Please install MetaMask!");
  }

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];

  // Get chainId from MetaMask
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  
  // Define chain from MetaMask's current network
  chain = defineChain({
    id: parseInt(chainId, 16),
    name: "Current Network",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: [] } },
  });

  walletClient = createWalletClient({
    chain,
    transport: custom(window.ethereum),
    account,
  });

  publicClient = createPublicClient({
    chain,
    transport: custom(window.ethereum),
  });

  console.log(`Connected network chainId: ${chain.id}`);
  console.log("Connected to MetaMask:", account);
  alert("Connected to MetaMask!");
}

async function storeData() {
  if (!walletClient) return alert("Connect MetaMask first.");
  const dataValue = document.getElementById("dataValue").value;

  const hash = await walletClient.writeContract({
    chain,
    account,
    address: contractAddress,
    abi: contractABI,
    functionName: "storeData",
    args: [dataValue],
  });
  console.log("Transaction sent:", hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Transaction confirmed:", receipt);
  alert("Data stored successfully!");
}

async function getData() {
  if (!publicClient) return alert("Connect MetaMask first.");

  const data = await publicClient.readContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getData",
  });
  alert(`Stored data: ${data}`);
  console.log("Data:", data);
}

// Expose functions to window for HTML onclick handlers
window.connectToMetamask = connectToMetamask;
window.storeData = storeData;
window.getData = getData;