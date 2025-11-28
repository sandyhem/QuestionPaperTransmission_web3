import React from 'react'
import Web3 from "web3";
export default function Ipfs() {

const web3 = new Web3();
const account = web3.eth.accounts.create();
console.log(account);

  return (
    <div>Ipfs</div>
  )
}
