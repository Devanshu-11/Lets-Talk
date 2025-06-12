import React, {useEffect, useState} from "react";
import {checkIfWalletConnected,connectWallet, connectingWithTheContract} from '../Utils/apiFeature.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

// Creating the context object
export const ChatAppContext=React.createContext();

// Component that stores and provides shared data to the app
export const ChatAppProvider=({children})=>{
    const [account, setAccount]= useState("");
    const [userName, setUserName]= useState("");
    const [friendLists, setFriendLists]= useState([]);
    const [friendMsg, setFriendMsg]= useState([]);
    const [loading, setLoading]= useState(false);
    const [userLists, setUserLists]= useState([]);
    const [error, setError]= useState("");

    // Chat user
    const [currentUserName, setCurrentUserName]= useState("");
    const [currentUserAddress, setCurrentUserAddress]= useState("");

    // for the router
    const navigate=useNavigate();
    const location=useLocation();

    // fetching the data at the time of page load
    const fetchData=async()=>{
        try{
            // get the contract
            const contract=await connectingWithTheContract();

            // get the account
            const connectAccount=await connectWallet();
            setAccount(connectAccount);

            // get the user name
            // const userName=await contract.getUsername(connectAccount);
            // setUserName(userName);

            // get my friend list
            const friendLists=await contract.getMyFriendList();
            setFriendLists(friendLists);

            // get all app users
            const userList=await contract.getAllAppUsers();
            setUserLists(userList);

        }catch(error){
            setError('Wallet is not connected, Please install and connect your wallet');
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    // Read the messages
    const readMessage=async(friendAddress)=>{
        try{
            const contract=await connectingWithTheContract();
            const read=await contract.readMessages(friendAddress);
            setFriendMsg(read);

        }catch(error){
            setError('You currently have no messages from this friend');
        }
    }

    // create the account
    const createAccount=async({name, accountAddress})=>{
        try{
            if(!name){
                return setError("Name is required to create an account, Please reload the browser");
            }

            const contract=await connectingWithTheContract();
            const getCreatedUser=await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();

        }catch(error){
            setError('Error occured while creating the account');
        }
    }

    // Add your friend
    const addFriends=async({accountAddress, name})=>{
        try{    
            if(!name||!accountAddress){
                return setError("Both name and account address are required to add a friend, Please reload the browser");
            }

            const contract=await connectingWithTheContract();
            const addMyFriend=await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            navigate("/");
            window.location.reload();

        }catch(error){
            setError('Something went wrong while adding the friend');
        }
    }

    // send message to the friend
    const sendMessage=async({address, msg})=>{
        try{

            if(!msg|| !address){
                return setError("Both a message and a valid address are required to send a message, Please try again");
            }

            const contract=await connectingWithTheContract();
            const addMessage=await contract.sendMessage(address,msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();

        }catch(error){
            setError('Please reload and try again');
        }
    }

    // read the user info
    const readUser=async(userAddress)=>{
        try{

            const contract=await connectingWithTheContract();
            const userName=await contract.getUsername(userAddress);
            setCurrentUserName(userName);
            setCurrentUserAddress(userAddress);

        }catch(error){
            setError('Error fetching user information, Please reload and try again');
        }
    }

    return(
        <ChatAppContext.Provider value={{readMessage, createAccount, addFriends, sendMessage, readUser,account, userName, friendLists, friendMsg, loading, userLists, error, currentUserName, currentUserAddress, checkIfWalletConnected, connectWallet, connectingWithTheContract}}>
            {children}
        </ChatAppContext.Provider>
    )
}