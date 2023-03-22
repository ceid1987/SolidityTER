const contractABI = [
    [{
            "inputs": [],
            "name": "enter",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "randomWinner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "PlayerEntered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "winner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "WinnerChosen",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "jackpot",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "name": "players",
            "outputs": [{
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];
const contractAddress = "0xdd73Bd81F94eBd96E65C4F5755aC583828280537"; // Replace with your deployed contract address

let web3;
let lottery;
let userAddress;

document.getElementById("connect").addEventListener("click", async() => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            initApp();
        } catch (err) {
            console.error("Access to the Ethereum account rejected.");
        }
    } else {
        console.error("No Ethereum provider detected. Please install MetaMask.");
    }
});

async function initApp() {
    lottery = new web3.eth.Contract(contractABI, contractAddress);
    userAddress = (await web3.eth.getAccounts())[0];

    document.getElementById("connect").style.display = "block";
    document.getElementById("walletInfo").style.display = "block";
    document.getElementById("address").innerText = userAddress;

    await updateInfo();

    // Add event listeners
    document.getElementById("enter").addEventListener("click", enterLottery);
}

async function updateInfo() {
    const jackpot = web3.utils.fromWei(await lottery.methods.jackpot().call(), "ether");
    document.getElementById("jackpot").innerText = web3.utils.fromWei(jackpot, "ether");

    const players = await lottery.methods.getPlayers().call();
    const playersList = document.getElementById("players");
    playersList.innerHTML = "";
    players.forEach(player => {
        const listItem = document.createElement("li");
        listItem.innerText = player;
        playersList.appendChild(listItem);
    });
}

async function enterLottery() {
    const amount = document.getElementById("amount").value;

    // Check if the entered amount is greater than zero
    if (parseFloat(amount) <= 0) {
        alert("You must enter a positive amount to participate in the lottery.");
        return;
    }
    const weiAmount = web3.utils.toWei(amount, "ether");

    await lottery.methods.enter().send({ from: userAddress, value: weiAmount });
    updateInfo();
}