import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/abi.json"
import Header from "./components/header.js";


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [items, setItems] = useState([]);

  /*
   * All state property to store all waves
   */

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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div>
      <Header items={items} currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount} setItems={setItems}
      />
      <div className="mainContainer">

        <div className="dataContainer">

          <div className="bio">
            Check out your CO2 emissions in Web3!
          </div>
        </div>
      </div>
    </div>
  );
}

export default App