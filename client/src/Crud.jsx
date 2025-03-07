import React, { useEffect, useState } from "react";
import Web3 from "web3";
import UserProfile from "./contracts/UserProfile.json";

export default function Crud() {
    const [state, setState] = useState({ web3: null, contract: null, account: null });
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      async function connectWallet() {
        if (window.ethereum) {
          try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();
  
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = UserProfile.networks[networkId];
  
            if (!deployedNetwork) {
              console.error("Contract not deployed on this network.");
              return;
            }
  
            const contract = new web3.eth.Contract(UserProfile.abi, deployedNetwork.address);
            setState({ web3, contract, account: accounts[0] });
  
            window.ethereum.on("accountsChanged", (accounts) => {
              setState((prevState) => ({ ...prevState, account: accounts[0] }));
            });
  
            fetchUsers(contract);
          } catch (error) {
            console.error("User denied wallet connection:", error);
          }
        } else {
          console.error("MetaMask not detected.");
        }
      }
  
      connectWallet();
    }, []);
  
    async function fetchUsers(contract) {
      if (!contract) return;
      let userList = [];
      const userCount = await contract.methods.userCount().call();
  
      for (let i = 1; i <= userCount; i++) {
        const user = await contract.methods.getUser(i).call();
         if(user.age!=0)
         userList.push(user);
      }
      setUsers(userList);
    }
  
    
    async function createUser() {
      const { contract, account } = state;
      const name = document.querySelector("#name").value;
      const age = document.querySelector("#age").value;
  
      if (!account) {
        alert("Please connect your wallet!");
        return;
      }
  
      try {
        await contract.methods.createUser(name, age).send({ from: account });
        window.location.reload();
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  
    async function updateUser() {
      const { contract, account } = state;
      const id = document.querySelector("#updateId").value;
      const name = document.querySelector("#updateName").value;
      const age = document.querySelector("#updateAge").value;
  
      try {
        await contract.methods.updateUser(id, name, age).send({ from: account });
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  
    async function deleteUser() {
      const { contract, account } = state;
      const id = document.querySelector("#deleteId").value;
  
      try {
        await contract.methods.deleteUser(id).send({ from: account });
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  
    return (
      <div>
        <h2>Connected Account: {state.account || "Not Connected"}</h2>
  
        <h3>Create User</h3>
        <input type="text" id="name" placeholder="Name" />
        <input type="number" id="age" placeholder="Age" />
        <button onClick={createUser}>Add User</button>
  
        <h3>Update User</h3>
        <input type="number" id="updateId" placeholder="User ID" />
        <input type="text" id="updateName" placeholder="New Name" />
        <input type="number" id="updateAge" placeholder="New Age" />
        <button onClick={updateUser}>Update User</button>
  
        <h3>Delete User</h3>
        <input type="number" id="deleteId" placeholder="User ID" />
        <button onClick={deleteUser}>Delete User</button>
  
        <h3>User List</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              ID: {user.id}, Name: {user.name}, Age: {user.age}
            </li>
          ))}
        </ul>
      </div>
    );
}
