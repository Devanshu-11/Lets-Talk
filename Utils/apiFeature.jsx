import { ethers } from "ethers";
import Web3 from 'web3';
import {ChatAppAddress,ChatAppABI} from '../Context/constants.jsx';

export const checkIfWalletConnected=async()=>{
    try{
        if(!window.ethereum){
            return console.log("Installed the Metamask");
        }

        const accounts=await window.ethereum.request({method: 'eth_accounts'});
        const firstAccount=accounts[0];
        return firstAccount;
    }catch(error){
        console.log(error);
    }
}

export const connectWallet=async()=>{
    try{
        if(!window.ethereum){
            return console.log("Installed the Metamask");
        }

        const accounts=await window.ethereum.request({method: 'eth_requestAccounts'});
        const firstAccount=accounts[0];
        return firstAccount;

    }catch(error){
        console.log(error);
    }
}

// Fetching the contract
const fetchContract=(signerOrProvider)=>new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

// Now connecting with the contract
export const connectingWithTheContract=async()=>{
    try{
        if(!window.ethereum){
            return console.log("Installed the Metamask");
        }

        // create an ethers provider from meta mask
        const provider=new ethers.BrowserProvider(window.ethereum);

        // get the signer
        const signer=await provider.getSigner();

        // Create a contract instance with the signer
        const contract=fetchContract(signer);

        // Return the contract
        return contract;

    }catch(error){
        console.log(error);
    }
}

// convert time
export const convertTime=(time)=>{
    const newTime=new Date(time.toNumber());
    const realTime=newTime.getHours+ "/"+ newTime.getMinutes+ "/"+ newTime.getSeconds+ "Date: "+newTime.getDate()+ "/"+ (newTime.getMonth()+1)+ "/"+ newTime.getFullYear();
    return realTime;
}