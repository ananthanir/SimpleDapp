async function connectToMetamask() {
   result = await ethereum.enable();
   console.log("Account Address: ", result)
}

$(document).ready(function(){
    web3Obj = new Web3(ethereum)

    const ContractABI = [
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
    ]

    const ContractAddress = "0xA8075530AF7aaBA965C0beb05cD407ab4a808ABc";

    ContractObject = new web3Obj.eth.Contract(ContractABI, ContractAddress);

    console.log("Contract Object: ", ContractObject);
})

async function storeData() {
    value = document.getElementById("dataValue").value;
    // console.log(value);
    tx = await ContractObject.methods.storeData(value).send({from: ethereum.selectedAddress});
    console.log(tx);
    alert("Data Stored")
}

async function getData() {
    result = await ContractObject.methods.getData().call();
    alert("Stored Data Value: " + result)
}