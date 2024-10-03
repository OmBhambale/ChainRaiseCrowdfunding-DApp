// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        mapping(address => uint256) contributions;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    event CampaignCreated(uint256 campaignId, address owner, string title, uint256 target, uint256 deadline);
    event ContributionMade(uint256 campaignId, address contributor, uint256 amount);
    event FundsClaimed(uint256 campaignId, address owner, uint256 amount);

    function createCampaign(string memory _title, string memory _description, uint256 _target, uint256 _deadline) public {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.owner = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;

        emit CampaignCreated(campaignCount, msg.sender, _title, _target, _deadline);
        campaignCount++;
    }

    function contribute(uint256 _campaignId) public payable {
    require(_campaignId < campaignCount, "Campaign does not exist"); // Check if campaign exists
    Campaign storage campaign = campaigns[_campaignId];
    require(block.timestamp < campaign.deadline, "Campaign has ended");

    campaign.contributions[msg.sender] += msg.value;
    campaign.amountCollected += msg.value;

    emit ContributionMade(_campaignId, msg.sender, msg.value);
    }


    function claimFunds(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.owner, "Only the campaign owner can claim funds");
        require(block.timestamp >= campaign.deadline, "Campaign has not ended yet");
        require(campaign.amountCollected >= campaign.target, "Funding goal not reached");

        uint256 amountToTransfer = campaign.amountCollected;
        campaign.amountCollected = 0;
        payable(campaign.owner).transfer(amountToTransfer);

        emit FundsClaimed(_campaignId, campaign.owner, amountToTransfer);
    }

    function getCampaignDetails(uint256 _campaignId) public view returns (
        address owner,
        string memory title,
        string memory description,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected
    ) {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected
        );
    }

    function getContribution(uint256 _campaignId, address _contributor) public view returns (uint256) {
        return campaigns[_campaignId].contributions[_contributor];
    }
}