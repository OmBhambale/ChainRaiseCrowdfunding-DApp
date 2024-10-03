import React from 'react';
import ContributionForm from './ContributionForm';
import { ethers } from 'ethers';

const CampaignList = ({ campaigns = [], onContribute }) => {
    return (
        <div>
            <h2>Active Campaigns</h2>
            <div>
                {campaigns.length === 0 ? (
                    <p>No active campaigns</p>
                ) : (
                    campaigns.map((campaign, index) => (
                        <div className="campaign-card" key={index}>
                            <h3 className="campaign-title">{campaign.title}</h3>
                            <p className="campaign-description">{campaign.description}</p>
                            <p className="campaign-stats">
                                <strong>Funding Goal:</strong> {ethers.utils.formatEther(campaign.goal)} ETH
                            </p>
                            <p className="campaign-stats">
                                <strong>Amount Raised:</strong> {ethers.utils.formatEther(campaign.raised)} ETH
                            </p>
                            <ContributionForm campaignId={index + 1} onContribute={onContribute} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CampaignList;
