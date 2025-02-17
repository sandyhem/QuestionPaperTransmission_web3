import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import SimpleStorage from "./contracts/SimpleStorage.json"

export default function App() {

  const [state,setState]=useState({web3:null,contract:null});
  const [data,setData]=useState("nil");

  useEffect(()=>{
    //to connect to bc
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");//from ganache
    async function template(){
      const web3 =new Web3(provider);
      // console.log(web3);

      //to interact with a smart contract we require two things:
      //1.ABI
      //2.Contract Address

      //to get the smart contract address:
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      // console.log(deployedNetwork.address);

      //To get the ABI
      const contract =new web3.eth.Contract(SimpleStorage.abi,deployedNetwork.address);
      //console.log(contract);//instance of our constant with whom we are going to make an interaction
      setState({web3:web3,contract:contract});
    }
    provider && template();
  },[]);
  // console.log(state)

  //TO READ: call()
  //TO WRITE: send()
  useEffect(()=>{
    const {contract}=state;
    async function readData(){
      //in the contract->methods->method_name->call
      const data =await contract.methods.getter().call();
      setData(data);
      // console.log(data);
    }
    contract && readData(); //contract obj ready then call the readData()
  },[state]);

  async function writeData(){
    const {contract}=state;
    const data = document.querySelector("#value").value;
    await contract.methods
      .setter(data)
      .send({from:"0xaCc62B18d29fB72E3628C2e836Dd16917070a7E8"});
    window.location.reload();
  }
  return (
    <div>
      <p>Contract data: {data}</p>
      <input type="text" id="value" />
      <button onClick={writeData}>Change Data</button>
    </div>
  )
}
