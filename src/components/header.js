import { React } from "react";
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import axios from "axios";
import { ReactComponent as RedTree } from './../assets/red_tree.svg';
import { ReactComponent as OrangeTree } from './../assets/orange_tree.svg';
import { ReactComponent as GreenTree } from './../assets/green_tree.svg';

function Header(props) {

    /*
    * Create a method that gets all waves from your contract
    */

    const getData = async () => {
        if (props.currentAccount) {
        try {
        const api_endpoint = `https://api.covalenthq.com/v1/1/address/${props.currentAccount}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=10000&key=ckey_8f68249e3fce44109f7386dabc5:`
        console.log(api_endpoint)
        const response = await axios.get(api_endpoint);
        console.log(response.data);
        props.setItems(response.data.data.items)
            } catch (err) {
        // Handle Error Here
        console.error(err);
        }} else {
        console.error("NOT Connected");
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
        props.setCurrentAccount(accounts[0]); 
        } catch (error) {
        console.log(error)
        }
    }

    return <Navbar collapseOnSelect expand='sm' bg='primary' variant='dark' margin-top="20px">
        {!props.currentAccount && (
            <div>
                <Navbar.Brand style={{fontSize: "16px", fontWeight: "900", marginLeft: "2rem"}}>SusDAO</Navbar.Brand>
                <button className="waveButton" onClick={connectWallet}>
                Connect Wallet
                </button>
            </div>
        )}
        {props.currentAccount && (
            <div>
                <Navbar.Brand style={{fontSize: "16px", fontWeight: "900", marginLeft: "2rem"}}>SusDAO</Navbar.Brand>
                <button className="waveButton">
                    {props.currentAccount.substring(0,6) + "..." + props.currentAccount.substring(props.currentAccount.length -4, props.currentAccount.length)}
                </button>
                <RedTree className="navbarTree"/>
            </div>
        )}
    </Navbar>
}

export default Header;