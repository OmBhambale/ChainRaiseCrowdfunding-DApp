// src/components/Crowdfunding/yourApiService.js
import { ethers } from 'ethers'; // Import ethers to interact with the blockchain
import ContractABI from '../utils/contractABI.json'; // Adjust the path to your ABI file

const CONTRACT_ADDRESS = '0xCfC462b1ed53255Bb4EAE4Ad384DA3f375A1fF4C'; // Your deployed contract address

export const getCampaigns = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // Ensure MetaMask is installed
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);
    
    // Call a function from your contract to get campaigns
    const campaigns = await contract.getCampaigns(); // Replace with your contract's method
    return campaigns.map(campaign => ({
      id: campaign.id.toString(),
      title: campaign.title,
      description: campaign.description,
      goal: ethers.utils.formatEther(campaign.goal), // Convert goal from Wei to ETH
      raised: ethers.utils.formatEther(campaign.raised), // Convert raised from Wei to ETH
    }));
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error; // Propagate the error to the parent component
  }
};
