import './App.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { MainContext } from './MainContext';
import Header from './Components/Header/Header';
import Drawer from './Components/Drawer/Drawer';
import Home from './Screens/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Help from './Screens/Help/Help';
import Game from './abis/Game.json';
import Create from './Screens/Create/Create';

function App() {
  const [account, setAccount] = useState(); // state variable to set account.
  const [startedGame, setStartedGame] = useState(false);
  const [startedGameIndex, setStartedGameIndex] = useState();
  const [wordsCount, setWordsCount] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contract, setContract] = useState();
  const [owner, setOwner] = useState();
  const [Ready, setReady] = useState(false);
  const [price,setPrice] = useState({
    fee:0
  }) 

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const GameData = Game.networks[networkId];

      if (GameData) {
        const GameContract = new web3.eth.Contract(Game.abi, GameData.address);
        const owner = await GameContract.methods.admin().call()
        const startedGame = await GameContract.methods.startedGame(accounts[0]).call()
        const wordsCount = await GameContract.methods.wordsCount().call()
        const fee = await GameContract.methods.fee().call()
        console.log(startedGame)
        setStartedGame(parseInt(startedGame)==0?false:true);
        setStartedGameIndex(startedGame);
        setWordsCount(wordsCount);
        setPrice({
          fee:fee
        })
        setContract(GameContract);
        setOwner(owner);
        setReady(true);
      }
      else{
        alert ("please switch network")
      }
    }

    load();
  }, []);



  return (
    <div className="App">
      <MainContext.Provider value={{ account, drawerOpen, contract, owner, price, startedGame, startedGameIndex, wordsCount, setOpenDrawer: (val) => setDrawerOpen(val), setStartedGame:(val) => setStartedGame(val) }}>
        <Router>
          <Header />
          {Ready && <div className="App__content">
            <Drawer />
            <div className="App__content__inner"
              style={{ marginLeft: drawerOpen ? "290px" : "0px" }}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/help">
                  <Help />
                </Route>
                <Route path="/create">
                  <Create
                   />
                </Route>
              </Switch>
            </div>
          </div>}
        </Router>
      </MainContext.Provider>
    </div>
  );
}

export default App;
