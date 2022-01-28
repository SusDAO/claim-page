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

    const renderCuteTree = () => {
        switch(props.nftState) {
            case 1:
                return <RedTree className="navbarTree" />;
            case 2:
                return <OrangeTree className="navbarTree" />;
            case 3:
                return <GreenTree className="navbarTree" />;
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
                {renderCuteTree()}
            </div>
        )}
    </Navbar>
}

export default Header;