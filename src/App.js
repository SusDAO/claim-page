import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/abi.json"
import Header from "./components/header.js";
import axios from "axios";
import { ReactComponent as TreeGray } from './assets/TreeGray.svg';
import { ReactComponent as TreeGreen } from './assets/TreeGreen.svg';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [items, setItems] = useState([]);
  const [offsetPercentage, setOffsetPercentage] = useState("");
  const actualOffsetPercentage = 100.0 - offsetPercentage;
  const [nftState, setNftState] = useState(0);
  // const [deforestedTrees, setDeforestedTrees] = useState("");

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

  const onPositionChange = React.useCallback((position) => {
    let percentage = position.toFixed(2);
    setOffsetPercentage(percentage);
  }, []);

  const offsetButtonOnChange = () => {
    if (nftState < 3) {
      setNftState(nftState + 1);
    }
  }

  const kGCarbonEmissions = 10420;
  const numberOfRoundTripFlights = Math.round(10420/1500);
  const TREES_PER_TON = 6;
  const numberTrees = Math.round(kGCarbonEmissions/1000*TREES_PER_TON);
  const amountToOffset = Math.round(kGCarbonEmissions * actualOffsetPercentage / 100);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div>
      <Header items={items} currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount} setItems={setItems}
        nftState={nftState}
      />

    <div className="mainContainer">
      <div className="dataContainer">
        
        <div className="bio">
          Check out your CO2 emissions in Web3!
        </div>
        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <div className="walletNotConnected">
            <div className="treeSlider">
              <TreeGray style={{ height: 400, width: 400 }}/>
            </div>
          </div>
        )}

        {currentAccount && (
          <div className="walletConnected">
            <div className="treeSlider">
              <ReactCompareSlider
                onPositionChange={onPositionChange}
                portrait="false"
                  itemOne={<TreeGray style={{ height: 400, width: 400 }}/>}
                  itemTwo={<TreeGreen style={{ height: 400, width: 400 }}/>}
              />
            </div>
            <div className="offsetPercentage">{actualOffsetPercentage.toFixed(2)}%</div>
            <div className="bio">
              <div>Your Ethereum transactions amount to <span class="bigNumber">{kGCarbonEmissions} kg</span> carbon emissions.</div>
              <div>This corresponds to <span class="bigNumber">{numberOfRoundTripFlights}</span> roundtrip flights between SF and Miami!</div>
              <div>It would take <span class="bigNumber">{numberTrees}</span> mature trees an entire year to offset this amount.</div>
            </div>
            <button className="offsetButton" onClick={offsetButtonOnChange}>
              Offset your carbon footprint by {amountToOffset} kg
            </button>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}

export default App