import Web3 from 'web3'; // Import Web3
import Crowdfunding from './build/Crowdfunding.json' assert { type: 'json' }; // Import the JSON file

// Connect to Ganache
const web3 = new Web3('http://127.0.0.1:7545'); // Default Ganache port

async function deploy() {
    const accounts = await web3.eth.getAccounts();

    // Deploy the contract
    const result = await new web3.eth.Contract(Crowdfunding.abi) // Use Crowdfunding.abi
        .deploy({ data: Crowdfunding.bytecode }) // Use Crowdfunding.bytecode
        .send({ from: accounts[0], gas: '5000000' }); // Adjust gas limit as needed

    console.log('Contract deployed to:', result.options.address);
}

deploy()
    .then(() => console.log('Deployment completed'))
    .catch(error => console.error('Deployment failed:', error));
