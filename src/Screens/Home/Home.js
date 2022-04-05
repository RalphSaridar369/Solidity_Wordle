import React, { useEffect, useContext, useState } from 'react';
import './Home.css';
import { MainContext } from '../../MainContext';
import { divideBy, multiplyBy } from '../../helpers';
import OTPInput from "otp-input-react";

const Home = () => {

  const [word,setWord] = useState("");
  const [data, setData] = useState({});
  const { contract, account, price, wordsCount, owner, startedGame, startedGameIndex, setStartedGame } = useContext(MainContext)

  useEffect(() => {
    const getData = async () => {
      if (startedGame) {
        let gameData = await contract.methods.getGameData(startedGameIndex - 1).call();
        console.log(gameData)
        setData({
          word: gameData[0],
          livesLeft: parseInt(gameData[2])
        })
      }
    }
    getData();
  }, [])

  const startGame = async () => {
    let choice = Math.floor(Math.random() * (wordsCount - 1)) + 1
    console.log(parseInt(price.fee).toString())
    await contract.methods.startGame(choice).send({ from: account, value: parseInt(price.fee).toString() })
      .once('receipt', (receipt) => {
        setStartedGame(true);
      });
  }

  const checkWord = async() =>{
    if(word.length!=5){
      alert("Make sure to insert 5 characters")
    }
    else{
      let result = await contract.methods.checkWord(word).send({from:account});
      console.log(result)
    }
  }

  return (
    <div>
      {!startedGame ? <button onClick={() => startGame()}>Start Game</button> :
        <div>
          <div className='game__header'>
            <h2>Game Started</h2>
            <h2>Lives: {data.livesLeft}</h2>
          </div>
          <div className='game__word__guess'>
            _ _ _ _ _
          </div>
          <div className='game__word__input'>
            <OTPInput value={word} onChange={setWord} autoFocus OTPLength={5} otpType="alpha" disabled={false} />
            <button onClick={()=>checkWord()}>Check word</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Home