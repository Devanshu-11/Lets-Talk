// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ChatApp{
    // each User has a name and a list of friends
    struct user{
        string name;
        friend[] friendList;
    }

    // now about the friend
    struct friend{
        address publicKey;
        string name;
    }

    // about the message
    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    // Mapping
    mapping(address=>user) userList;
    mapping(bytes32=>message[]) allMessages;

    // check if user exists or not
    function checkUserExists(address publicKey) public view returns(bool){
        return bytes(userList[publicKey].name).length>0;
    }

    // create account function
    function createAccount(string calldata name) external{
        require(checkUserExists(msg.sender)==false,'User already exists');
        require(bytes(name).length>0,'User name cannot be empty');
        userList[msg.sender].name=name;
    }

    // get the username based on their address
    function getUsername(address publicKey) external view returns(string memory){
        require(checkUserExists(publicKey)==true,'User not registered');
        return userList[publicKey].name;
    }

    // to add the friend
    function addFriend(address friendKey, string calldata name) external{
        require(checkUserExists(msg.sender)==true,'Create an account first');
        require(checkUserExists(friendKey)==true,'User is not registered');
        require(msg.sender!=friendKey,'User cannot add themselves as a friend');

        // check if it is already friend or not
        require(checkAlreadyFriends(msg.sender, friendKey)==false,'Users are already friend');
        _addFriend(msg.sender, friendKey,name);
        _addFriend(friendKey, msg.sender,userList[msg.sender].name);
    }

    // check if they are already friend or not
    function checkAlreadyFriends(address publicKey1, address publicKey2) internal view returns(bool){

        // we use it, so that function runs over shorter friend list
        if(userList[publicKey1].friendList.length >userList[publicKey2].friendList.length){
            address temp=publicKey1;
            publicKey1=publicKey2;
            publicKey2=temp;
        }

        for(uint256 i=0;i<userList[publicKey1].friendList.length;i++){
            if(userList[publicKey1].friendList[i].publicKey==publicKey2){
                return true;
            }
        }

        return false;
    }

    // add friend
    function _addFriend(address me_key, address friend_key, string memory name) internal{
        friend memory newFriend=friend(friend_key,name);
        userList[me_key].friendList.push(newFriend);
    }

    // get my all friends
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }


    // get chat code
    function _getChatCode(address publicKey1, address publicKey2) internal pure returns(bytes32){

        // it tells which address goes first when creating the address
        if(publicKey1<publicKey2){
            return keccak256(abi.encodePacked(publicKey1,publicKey2));
        }else{
            return keccak256(abi.encodePacked(publicKey2,publicKey1));
        }
    }
}