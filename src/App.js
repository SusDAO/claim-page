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
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [carbonFlights, setCarbonFlights] = useState(0);
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


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div>
      <Header items={items} currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount} setItems={setItems}
        offsetPercentage={offsetPercentage}
        setOffsetPercentage={setOffsetPercentage}
        carbonFootprint={carbonFootprint}
        setCarbonFootprint={setCarbonFootprint}
        carbonFlights={carbonFlights}
        setCarbonFlights={setCarbonFlights}
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
            <div className="offsetPercentage">{(100.0 - offsetPercentage).toFixed(2)}%</div>
            <div className="bio">
              {/* You can save the equivalent of {deforestedTrees} trees in the Amazon.  */}
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}

export default App