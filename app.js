// Your contract ABI and address
        const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "encryptedKey",
				"type": "string"
			}
		],
		"name": "FileUploaded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fileIndex",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "grantPermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "PermissionGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "PermissionRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fileIndex",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "revokePermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_encryptedKey",
				"type": "string"
			}
		],
		"name": "uploadFile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getAllSharedFiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "encryptedKey",
						"type": "string"
					}
				],
				"internalType": "struct DecentralizedFileStorage.FileInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getAllUserFiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "encryptedKey",
						"type": "string"
					}
				],
				"internalType": "struct DecentralizedFileStorage.FileInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUsersWithSharedFiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "encryptedKey",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "sharedWith",
						"type": "address"
					}
				],
				"internalType": "struct DecentralizedFileStorage.SharedFileInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "fileIndex",
				"type": "uint256"
			}
		],
		"name": "hasPermission",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userFiles",
		"outputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "encryptedKey",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

        const contractAddress = '0x9326A57a0291A6340Af14D9d997B952F1e209b4D';

        
// Web3 setup
let web3;
let contract;
let account;

async function connectWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = (await web3.eth.getAccounts())[0];
            contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log('Contract initialized:', contract);

            const networkId = await web3.eth.net.getId();
            console.log(`Connected Network ID: ${networkId}`);

            // Verify if the network is Sepolia Testnet
            if (parseInt(networkId, 10) !== 11155111) {
                alert('Please connect to the Sepolia Testnet');
                console.log('Currently connected to Network ID:', networkId);
            } else {
                // Fetch and display uploaded and shared files
                console.log('Fetching uploaded files...');
                await fetchUploadedFiles();
                console.log('Fetching shared files...');
                await fetchSharedFiles();
            }
        } catch (error) {
            console.error('User denied account access or there is an error', error);
            alert('Please connect your MetaMask account.');
        }
    } else {
        alert('MetaMask is not detected. Please install MetaMask.');
    }
}

// Fetch and display uploaded files
async function fetchUploadedFiles() {
    try {
        const files = await contract.methods.getAllUserFiles(account).call();
        const filesTable = document.getElementById('filesTable').getElementsByTagName('tbody')[0];

        filesTable.innerHTML = '';

        files.forEach((file, index) => {
            const row = filesTable.insertRow();
            const indexCell = row.insertCell(0);
            const hashCell = row.insertCell(1);
            const encryptedKeyCell = row.insertCell(2);

            indexCell.textContent = index + 1;
            hashCell.textContent = file.hash;
            encryptedKeyCell.textContent = file.encryptedKey;
        });
    } catch (error) {
        console.error('Error fetching uploaded files:', error);
    }
}

// Fetch and display shared files
async function fetchSharedFiles() {
    try {
        const files = await contract.methods.getAllSharedFiles(account).call();
        const sharedFilesTable = document.getElementById('usersSharedFilesTable').getElementsByTagName('tbody')[0];

        sharedFilesTable.innerHTML = '';

        files.forEach((file, index) => {
            const row = sharedFilesTable.insertRow();
            const indexCell = row.insertCell(0);
            const hashCell = row.insertCell(1);
            const ownerCell = row.insertCell(2);
            const sharedWithCell = row.insertCell(3);
            const encryptedKeyCell = row.insertCell(4);

            indexCell.textContent = index + 1;
            hashCell.textContent = file.hash;
            ownerCell.textContent = file.owner;
            sharedWithCell.textContent = file.sharedWith;
            encryptedKeyCell.textContent = file.encryptedKey;
        });
    } catch (error) {
        console.error('Error fetching shared files:', error);
    }
}

// Event listeners for buttons
document.getElementById('connectButton').addEventListener('click', connectWeb3);
document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const encryptedKey = document.getElementById('encryptedKey').value;

    if (fileInput.files.length > 0 && encryptedKey) {
        const file = fileInput.files[0];
        // You need to add your logic to upload the file to IPFS and get the hash

        const ipfsHash = 'your_ipfs_hash'; // Replace with actual IPFS hash
        await contract.methods.uploadFile(ipfsHash, encryptedKey).send({ from: account });
        await fetchUploadedFiles();
    } else {
        alert('Please select a file and enter an encrypted key.');
    }
});

document.getElementById('grantPermissionButton').addEventListener('click', async () => {
    const fileIndex = document.getElementById('fileIndex').value;
    const userAddress = document.getElementById('userAddress').value;

    if (fileIndex && userAddress) {
        await contract.methods.grantPermission(fileIndex, userAddress).send({ from: account });
        document.getElementById('permissionStatus').textContent = 'Permission granted successfully';
    } else {
        alert('Please enter a file index and user address.');
    }
});

// Call fetchSharedFiles on window load
window.onload = async () => {
    await connectWeb3();
    await fetchSharedFiles();
};
