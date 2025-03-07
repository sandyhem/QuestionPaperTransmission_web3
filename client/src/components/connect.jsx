import React from 'react'
import Web3 from 'web3'

export default function connect() {


    ///window.ethereum
    const connectWalletHandler = async() => {
        //checking for the metamask wallet is installed!]
        if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
               const web3 = new Web3(window.ethereum);
            } catch (error) {
               console.log(error.message)   
            }
           
        }
        else{
            alert("Please install MetaMask!");
        }
    }
  return (
    <div>
        <h1>Page to connect to the wallet!</h1>
        <button onClick={connectWalletHandler}>Connect</button>
    </div>
  )
}
