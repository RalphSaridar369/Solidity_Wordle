import React, { useEffect, useContext, useState } from 'react';
import './Home.css';
import { MainContext } from '../../MainContext';
import Web3 from 'web3';
import { divideBy, multiplyBy } from '../../helpers';

const Home = () => {
  
  const [lives,setLives] = useState();
  const [data, setData] = useState([]);
  const { contract, account, price, wordsCount, owner, startedGame, setStartedGame } = useContext(MainContext)

  useEffect(() => {
    const getData = async() =>{
      if(startedGame){
        let gameData = await contract.methods.games(startedGame).call();
        console.log(startedGame)
        console.log(gameData)
      }
    }
    getData();
  }, [])

  const startGame =async()=>{
    let choice = Math.floor(Math.random() * (wordsCount-1)) + 1
    console.log(parseInt(price.fee).toString())
    await contract.methods.startGame(choice).send({from:account, value:parseInt(price.fee).toString()})
    .once('receipt', (receipt) => {
      setStartedGame(true);
  });
  }

  return (
    <div>
      {!startedGame?<button onClick={()=>startGame()}>Start Game</button>:
      <div>
        <div className='game__header'>
          <h2>Game Started</h2>
          <h2>Lives: 6</h2>
        </div>
      </div>
      }
    </div>
  )
}

export default Home