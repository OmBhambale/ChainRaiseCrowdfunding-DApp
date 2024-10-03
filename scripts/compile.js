const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, '..', 'contracts', 'Crowdfunding.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Crowdfunding.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// Compile the contract
const compiled = solc.compile(JSON.stringify(input));

// Parse the compiled output
let output;
try {
  output = JSON.parse(compiled);
} catch (err) {
  console.error('Error parsing the compiled output:', compiled);
  throw err;
}

// Check for compilation errors
if (output.errors) {
  output.errors.forEach(err => {
    console.error(err.formattedMessage);
  });
  throw new Error('Compilation failed.');
}

// Extract the compiled contract
const contract = output.contracts['Crowdfunding.sol']['Crowdfunding'];

// Save the ABI and Bytecode to a JSON file
const buildDir = path.resolve(__dirname, '.', 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

const contractFilePath = path.resolve(buildDir, 'Crowdfunding.json');

const contractData = {
  abi: contract.abi,
  bytecode: contract.evm.bytecode.object,
};

fs.writeFileSync(contractFilePath, JSON.stringify(contractData, null, 2), 'utf8');

console.log(`Contract compiled successfully and saved to ${contractFilePath}`);

// Exporting for use in deployment
module.exports = contractData;
