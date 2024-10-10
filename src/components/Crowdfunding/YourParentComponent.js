import React from 'react';
import CampaignList from './CampaignList';
import { getCampaigns } from './yourApiService';
import CampaignForm from './CampaignForm';
import { ethers } from 'ethers';
import YourContract from './YourContract.json'; // Import your contract's ABI

const YourParentComponent = () => {
  const [campaigns, setCampaigns] = React.useState([]);
  const [contract, setContract] = React.useState(null); // State for the contract

  // Function to fetch campaigns from the smart contract
  const fetchCampaigns = async () => {
    try {
      const fetchedCampaigns = await getCampaigns(); // Fetch from deployed contract
      setCampaigns(fetchedCampaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  React.useEffect(() => {
    const initializeContract = async () => {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractAddress = '0x1EEff8aF771583036c60902a13817516794fD50C'; // Replace with your contract address
        const yourContract = new ethers.Contract(contractAddress, YourContract.abi, signer);
        setContract(yourContract); // Set the contract instance
        await fetchCampaigns(); // Fetch campaigns when the contract is initialized
      } else {
        console.log('Ethereum object does not exist');
      }
    };

    initializeContract();
  }, []);

  const handleContribute = (campaignId, contributionAmount) => {
    console.log(`Contributing ${contributionAmount} ETH to campaign ID: ${campaignId}`);
    // Logic to handle the contribution
  };

  return (
    <div>
      <h1>Crowdfunding DApp</h1>
      {contract && <CampaignForm contract={contract} fetchCampaigns={fetchCampaigns} />}
      <CampaignList campaigns={campaigns} onContribute={handleContribute} />
    </div>
  );
};

export default YourParentComponent;
