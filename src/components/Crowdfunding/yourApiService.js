// src/components/Crowdfunding/yourApiService.js
import { ethers } from 'ethers';
import ContractABI from '../utils/contractABI.json'; // Adjust the path to your ABI file

const CONTRACT_ADDRESS = '0x1EEff8aF771583036c60902a13817516794fD50C'; // Your deployed contract address

export const getCampaigns = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);
    
    const campaigns = [];
    for (let i = 0; i < await contract.campaignCount(); i++) {
      const campaignDetails = await contract.getCampaignDetails(i);
      campaigns.push({
        id: i.toString(),
        title: campaignDetails.title,
        description: campaignDetails.description,
        goal: ethers.utils.formatEther(campaignDetails.target),
        raised: ethers.utils.formatEther(campaignDetails.amountCollected),
      });
    }
    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};
