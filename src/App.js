import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "./components/utils/contractABI.json";
import CampaignForm from "./components/Crowdfunding/CampaignForm";
import CampaignList from "./components/Crowdfunding/CampaignList";
import ContributeForm from "./components/Crowdfunding/ContributionForm";
import './App.css'; // Import your global CSS file

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadProviderAndContract = async () => {
      if (window.ethereum) {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider);
        const newSigner = newProvider.getSigner();
        setSigner(newSigner);
        
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const newContract = new ethers.Contract(contractAddress, contractABI, newSigner);
        setContract(newContract);

        // Load campaigns from the smart contract
        await loadCampaigns(newContract);
      } else {
        console.error("MetaMask not found");
        setErrorMessage("Please install MetaMask to use this app.");
      }
    };

    loadProviderAndContract();
  }, []);

  const loadCampaigns = async (contract) => {
    try {
      const totalCampaigns = await contract.getCampaignCount(); // Assuming you have this method
      const campaignsData = [];

      for (let i = 0; i < totalCampaigns; i++) {
        const campaign = await contract.campaigns(i); // Assuming campaigns are stored in an array
        campaignsData.push(campaign);
      }

      setCampaigns(campaignsData);
    } catch (error) {
      console.error("Error loading campaigns:", error);
      setErrorMessage("Failed to load campaigns. Please try again.");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected");
        setErrorMessage(''); // Clear error message on successful connection
      } catch (err) {
        console.error("Error connecting wallet:", err);
        setErrorMessage("Failed to connect wallet. Please try again.");
      }
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>ChainRaise Crowdfunding DApp</h1>
        <button onClick={connectWallet}>Connect Wallet</button>
      </header>

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}

      <section className="hero">
        <h2>Your home for help</h2>
        <CampaignForm contract={contract} onCampaignCreated={loadCampaigns} />
      </section>

      <section className="campaign-list">
        <h2>Active Campaigns</h2>
        <CampaignList campaigns={campaigns} contract={contract} />
      </section>

      <section className="contribute-form">
        <h2>Contribute to a Campaign</h2>
        <ContributeForm contract={contract} />
      </section>
    </div>
  );
};

export default App;
