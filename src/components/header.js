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
        } catch (error) {
        console.log(error)
        }
        props.getData()
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