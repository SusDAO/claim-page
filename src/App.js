import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/abi.json"
import axios from "axios";
import { ReactComponent as TreeGray } from './assets/TreeGray.svg';
import { ReactComponent as TreeGreen } from './assets/TreeGreen.svg';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';


const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [items, setItems] = useState([]);


  /*
   * All state property to store all waves
   */

  /*
   * Create a method that gets all waves from your contract
   */

  const getData = async () => {
    if (currentAccount) {
     try {
      const api_endpoint = `https://api.covalenthq.com/v1/1/address/${currentAccount}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=10000&key=ckey_8f68249e3fce44109f7386dabc5:`
      console.log(api_endpoint)
      const response = await axios.get(api_endpoint);
      console.log(response.data);
      setItems(response.data.data.items)
         } catch (err) {
      // Handle Error Here
      console.error(err);
     }} else {
       console.error("NOT Connected");
     }
}

  
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const onPositionChange = React.useCallback((position) => {
    console.log('[OnPositionChange.onPositionChange]', position);
  }, []);

  

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        
        <div className="header">
        👋 Hey there!
        </div>
        <div className="bio">
          Check out your CO2 emissions in Web3!
        </div>
        <div className="treeSlider">
          <ReactCompareSlider
            onPositionChange={onPositionChange}
            portrait="false"
              itemOne={<TreeGray style={{ height: 400, width: 400 }}/>}
              itemTwo={<TreeGreen style={{ height: 400, width: 400 }}/>}
          />
         </div>
        <button className="waveButton" onClick={getData}>
          Get Climate FootPrint
        </button>
        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {currentAccount && (
          
          <div className="bio">
          Transactions: {items.length}
          </div>
        )}

        
      </div>
    </div>
  );
}

export default App