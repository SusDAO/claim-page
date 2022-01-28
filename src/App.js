import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import 'antd/dist/antd.css';
import './override.css';
import abi from "./utils/abi.json"
import Header from "./components/header.js";
import axios from "axios";
import { ReactComponent as TreeGray } from './assets/TreeGray.svg';
import { ReactComponent as TreeGreen } from './assets/TreeGreen.svg';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [items, setItems] = useState([]);
  const [offsetPercentage, setOffsetPercentage] = useState("");
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [carbonFlights, setCarbonFlights] = useState(0);
  const [carbonTrees, setCarbonTrees] = useState(0);
  const actualOffsetPercentage = 100.0 - offsetPercentage;
  const [nftState, setNftState] = useState(0);
  // const [deforestedTrees, setDeforestedTrees] = useState("");

  /*
   * All state property to store all waves
   */

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          getData();
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
        setCarbonTrees((carbonFootprint / 1000 * 6));

        // console.log(carbonFootprint);
        // console.log(carbonFlights);
        // console.log("Carbon Footprint: " + carbonFootprint + "KG of CO2");
        // console.log("Carbon Flights: " + carbonFlights + "round trip flights from SF to Miami");
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

  const kGCarbonEmissions = 17159.04;
  const numberOfRoundTripFlights = Math.round(kGCarbonEmissions / 594.8);
  const offsetButtonOnChange = () => {
    if (nftState < 3) {
      setNftState(nftState + 1);
    }
    showModal();
  }
  const TREES_PER_TON = 6;
  const numberTrees = Math.round(kGCarbonEmissions/1000*TREES_PER_TON);
  const amountToOffset = Math.round(kGCarbonEmissions * actualOffsetPercentage / 100);
  const numTokens = amountToOffset / 1000;
  const usdPrice = (numTokens * 5.09).toFixed(2);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  
  return (
    <div>

      <div>
        {/* <view style={{color: "transparent"}}> */}
      </div>
      <Header items={items} currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount} setItems={setItems}
        getData={getData} 
        nftState={nftState}
      />

    <div className="mainContainer">
      <div className="dataContainer">
        
        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <div className="walletNotConnected">
            <div className="treeSlider">
              <TreeGray style={{ height: 400, width: 400 }}/>
            </div>
            <div className="bio">
              Connect your wallet to discover your carbon footprint!
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
            <div className="offsetPercentage">Pay off {actualOffsetPercentage.toFixed(2)}% of your emissions for ${usdPrice} USD</div>
            <div className="bio">
              <div>Your Ethereum transactions amount to <span class="bigNumber">{carbonFootprint} kg</span> carbon emissions.</div>
              <div>This corresponds to <span class="bigNumber">{numberOfRoundTripFlights}</span> roundtrip flights between SF and Miami!</div>
              <div>It would take <span class="bigNumber">{numberTrees}</span> trees an entire year to offset this amount.</div>
            </div>
            <button className="offsetButton" onClick={offsetButtonOnChange}>
              Offset your carbon footprint by {amountToOffset} kg
            </button>
            <Modal title="Success" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleOk}>
                OK
              </Button>]} onOk={handleOk}
            >
              <p>Purchased {numTokens} BCT for ${usdPrice}. </p>
              <p>
                {currentAccount.substring(0,6) + "..." + currentAccount.substring(currentAccount.length -4, currentAccount.length)} + " has been whitelisted."
              </p>
              <p class="congratsText">Welcome to <span class="logoColor">SusDAO</span>! You will get your tiered NFT shortly :)</p>
            </Modal>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App