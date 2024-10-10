import React, { useState } from 'react';
import { ethers } from 'ethers';

const CampaignForm = ({ contract, fetchCampaigns }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const transaction = await contract.createCampaign(
        title,
        description,
        ethers.utils.parseEther(goal),
        Math.floor(Date.now() / 1000) + (duration * 86400) // Convert days to seconds
      );
      await transaction.wait();
      console.log('Campaign created successfully');

      // Fetch campaigns after creation
      fetchCampaigns(); // Ensure this is called to refresh the campaign list
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Campaign</h2>
      <input
        type="text"
        placeholder="Campaign Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Campaign Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Funding Goal (ETH)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duration (days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <button type="submit">Create Campaign</button>
    </form>
  );
};

export default CampaignForm;
