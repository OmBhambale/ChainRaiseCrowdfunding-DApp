// YourParentComponent.js

import React from 'react';
import CampaignList from './CampaignList';
import { getCampaigns } from './yourApiService';

const YourParentComponent = () => {
  const [campaigns, setCampaigns] = React.useState([]);

  // Fetch campaigns when the component mounts
  React.useEffect(() => {
    const fetchCampaigns = async () => {
      const fetchedCampaigns = await getCampaigns();
      setCampaigns(fetchedCampaigns);
    };
    
    fetchCampaigns();
  }, []);

  // Define the onContribute function
  const handleContribute = (campaignId, contributionAmount) => {
    console.log(`Contributing ${contributionAmount} ETH to campaign ID: ${campaignId}`);
    // Logic to handle the contribution
  };

  return (
    <div>
      <h1>Crowdfunding DApp</h1>
      <CampaignList campaigns={campaigns} onContribute={handleContribute} />
    </div>
  );
};

export default YourParentComponent;
