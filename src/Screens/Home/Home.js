import React, { useEffect, useContext, useState } from 'react';
import './Home.css';
import { MainContext } from '../../MainContext';
import Web3 from 'web3';
import { divideBy, multiplyBy } from '../../helpers';

const Home = () => {
  
  const [lives,setLives] = useState();
  const [data, setData] = useState([]);
  const { contract, account, price, owner, startedGame, setStartedGame } = useContext(MainContext)

  useEffect(() => {
    console.log(startedGame)
  }, [])

  const startGame =async()=>{
    console.log(parseInt(price.fee).toString())
    await contract.methods.startGame(0).send({from:account, value:parseInt(price.fee).toString()})
    .once('receipt', (receipt) => {
      setStartedGame(true);
  });
  }

  return (
    <div>
      {!startedGame?<button onClick={()=>startGame()}>Start Game</button>:<div>Game Started</div>}
    </div>
  )
}

export default Home