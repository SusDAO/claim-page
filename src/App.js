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

  const getData = async () => {
        // if (props.currentAccount) {
        //     try {
                // const api_endpoint = `https://api.covalenthq.com/v1/1/address/${currentAccount}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=10000&key=ckey_a9997b6fa653474b8af7421fa82:`
                // console.log(api_endpoint)
                // const response = await axios.get(api_endpoint);
                // console.log(response.data);
                // setItems(response.data.data.items)
        setItems(new Array(144).fill(0))
        console.log(items)
        // props.setCarbonFootprint(props.items.length * 119.16);
        setCarbonFootprint(144 * 119.16);
        setCarbonFlights((carbonFootprint / 594.8).toFixed(2));

        console.log(carbonFootprint);
        console.log(carbonFlights);
        console.log("Carbon Footprint: " + carbonFootprint + "KG of CO2");
        console.log("Carbon Flights: " + carbonFlights + "round trip flights from SF to Miami");
        //     } catch (err) {
        //         // Handle Error Here
        //         console.error(err);
        //     }
        // } else {
        //     console.error("NOT Connected");
        // }
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
        getData={getData} 
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