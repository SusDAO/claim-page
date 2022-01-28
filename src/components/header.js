import { React } from "react";
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import axios from "axios";

function Header(props) {

    /*
    * Create a method that gets all waves from your contract
    */ 

     
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
        props.setCurrentAccount(accounts[0]); 
        getData();
        } catch (error) {
        console.log(error)
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
        props.setItems(new Array(144).fill(0))
        console.log(props.items)
        // props.setCarbonFootprint(props.items.length * 119.16);
        props.setCarbonFootprint(144 * 119.16);
        console.log(props.carbonFootprint);
        props.setCarbonFlights((props.carbonFootprint / 594.8).toFixed(2));
        console.log(props.carbonFlights);
        console.log("Carbon Footprint: " + props.carbonFootprint.toString() + "KG of CO2");
        console.log("Carbon Flights: " + props.carbonFlights.toString() + "round trip flights from SF to Miami");
        //     } catch (err) {
        //         // Handle Error Here
        //         console.error(err);
        //     }
        // } else {
        //     console.error("NOT Connected");
        // }
    }

    return <Navbar collapseOnSelect expand='sm' bg='primary' variant='dark' margin-top="20px">
        <Navbar.Brand style={{fontSize: "40px", fontWeight: "bold", marginLeft: "2rem"}}>SusDAO</Navbar.Brand>
        {!props.currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
              Connect Wallet
            </button>
        )}
        {props.currentAccount && (
            <button className="waveButton">
                {props.currentAccount.substring(0,6) + "..." + props.currentAccount.substring(props.currentAccount.length -4, props.currentAccount.length)}
            </button>
        )}
    </Navbar>
}

export default Header;