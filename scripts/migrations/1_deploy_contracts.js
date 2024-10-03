// 1_deploy_contracts.js
const Crowdfunding = artifacts.require("Crowdfunding");

export default async function(deployer) {
  console.log("Starting deployment...");
  await deployer.deploy(Crowdfunding);
  console.log("Deployment finished.");
};
