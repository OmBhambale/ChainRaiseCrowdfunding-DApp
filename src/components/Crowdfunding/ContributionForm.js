// ContributionForm.js

import React, { useState } from 'react';

const ContributionForm = ({ campaignId, onContribute }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onContribute) {
      onContribute(campaignId, amount); // Call the onContribute function passed as prop
    } else {
      console.error('onContribute is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
        required
      />
      <button type="submit">Contribute</button>
    </form>
  );
};

export default ContributionForm;
