import React, {useState,useEffect, useContext} from 'react';
import './Create.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {MainContext} from '../../MainContext'
import { multiplyBy } from '../../helpers';

const Create = () => {
    const {account, contract, owner} = useContext(MainContext)
    const [data,setData] = useState({
        word:"",
    })
    const [fee,setFee] = useState();

    useEffect(()=>{
        if(owner != account)
            window.location.href="/"
    },[])

    const onChange = (type,value) =>{
        setData({...data,[type]:value})
    }

    const onSubmit = async() =>{
        let valid = true;
        Object.keys(data).map((item,index)=>{
            if(data[item].length<1){
                alert(`${item} is empty`)
                valid=false;
                return
            }
        })
        if(valid){
            console.log(data)
            let {question,option1,option2} = data;
            await contract.methods.createQuestion(question,option1,option2).send({from: account})
            .once('receipt',(receipt)=>{
                alert("Question created successfully");
            });
        }
    }

    const changeFee = async() =>{
        if(fee){
            await contract.methods.changeFee(multiplyBy(fee)+"").send({from: account})
            .once('receipt',(receipt)=>{
                alert("Fee changed successfully");
            });;
        }
    }

    return (
        <div className='create'>
            <div className='input__container'>
                <h1>Add a word</h1>
                <TextField id="outlined-basic" value={data.word} onChange={(e)=>onChange("word",e.target.value)} label="Word" variant="outlined" className='input' multiline/>
                <Button variant="contained" className="button" onClick={onSubmit}>Submit</Button>
            </div>
            <div className='input__container'>
                <h1>Change</h1>
                <TextField id="outlined-basic" value={fee} onChange={(e)=>setFee(e.target.value)} label="Change Fee" variant="outlined" className='input' multiline/>
                <Button variant="contained" className="button" onClick={changeFee}>Change Fee</Button>
            </div>
        </div>
    )
}

export default Create