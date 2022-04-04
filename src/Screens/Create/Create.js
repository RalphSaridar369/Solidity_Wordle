import React, { useState, useEffect, useContext } from 'react';
import './Create.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MainContext } from '../../MainContext'
import { multiplyBy } from '../../helpers';

const Create = () => {
    const { account, contract, owner } = useContext(MainContext)
    const [data, setData] = useState({
        word: "",
        words: []
    })
    const [fee, setFee] = useState();

    useEffect(() => {
        const getWords = async () => {
            if (owner != account)
                window.location.href = "/"
            else {
                let words = await contract.methods.getWords().call();
                console.log(words);
                setData({ ...data, words });
            }
        }
        getWords();
    }, [])

    const onChange = (type, value) => {
        setData({ ...data, [type]: value })
    }

    const onSubmit = async () => {
        let valid = true;
        let hasNumber = /\d/;
        if (data.word.length != 5) {
            alert("Make sure to insert a word of 5 characters");
            valid = false;
        }
        else if (hasNumber.test(data.word)) {
            alert("Word can't have numbers in it");
            valid = false;
        }
        if (valid) {
            await contract.methods.addWord(data.word).send({ from: account })
                .once('receipt', (receipt) => {
                    alert("Word added successfully");
                });
        }
    }

    const changeFee = async () => {
        if (fee) {
            await contract.methods.changeFee(multiplyBy(fee) + "").send({ from: account })
                .once('receipt', (receipt) => {
                    alert("Fee changed successfully");
                });;
        }
    }

    return (
        <>
            <div className='create'>
                <div className='input__container'>
                    <h1>Add a word</h1>
                    <TextField id="outlined-basic" value={data.word} onChange={(e) => onChange("word", e.target.value)} label="Word" variant="outlined" className='input' multiline />
                    <Button variant="contained" className="button" onClick={onSubmit}>Submit</Button>
                </div>
                <div className='input__container'>
                    <h1>Change</h1>
                    <TextField id="outlined-basic" value={fee} onChange={(e) => setFee(e.target.value)} label="Change Fee" variant="outlined" className='input' multiline />
                    <Button variant="contained" className="button" onClick={changeFee}>Change Fee</Button>
                </div>
            </div>
            <div className="words">
                <h1>Words</h1>
                <ul>
                {data.words.map((item,index)=>{
                    return <li key={index} className="words__item">{item}</li> 
                })}
                </ul>
            </div>
        </>
    )
}

export default Create