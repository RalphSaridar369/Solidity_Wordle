import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  const [account,setAccount] = useState("0x00");

  //Load the web3 aka metamask
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. you should consider trying Metamask');
    }
  }

  
  const loadBlockchainData = async()=>{
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    await setAccount(accounts[0])
    // console.log(accounts);

    const networkId = await web3.eth.net.getId();
    // console.log(networkId)

    //load contract as folllowing
    /* const daiTokenData = DaiToken.networks[networkId];
    if(daiTokenData){
      const daiToken = new web3.eth.Contract(DaiToken.abi,daiTokenData.address);
      let daiTokenBalance = await daiToken.methods.balanceOf(accounts[0]).call();
      console.log("Balance Dai: ",daiTokenBalance)
      setTokenData({...tokenData,daiToken,daiTokenBalance:daiTokenBalance.toString()});
    }
    else{
      window.alert("DaiToken contract not deployed to detected network");
    } */
  }

  const runEffect = async () =>{ 
    await loadWeb3();
    await loadBlockchainData();
  }

  useEffect(() => {
    runEffect();
  }, [])
  return (
    <div>
      <Navbar account={account}/>
    </div>
  );
}

export default App;
