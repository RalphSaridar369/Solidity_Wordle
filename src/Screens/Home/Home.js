import React, { useEffect, useContext, useState } from 'react';
import './Home.css';
import { MainContext } from '../../MainContext';
import Web3 from 'web3';
import { divideBy, multiplyBy } from '../../helpers';

const Home = () => {
  
  const [data, setData] = useState([]);
  const { contract, account, price, owner, startedGame } = useContext(MainContext)

  useEffect(() => {
    console.log(startedGame)
  }, [])

  const startGame =async()=>{
    await contract.methods.startGame().send({from:account, value:parseInt(price.fee).toString()})
  }

  return (
    <div>
      {!startedGame?<button onClick={()=>startGame()}>Start Game</button>:<>Game Started</>}
    </div>
  )
}

export default Home