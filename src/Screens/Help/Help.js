import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className='help'>
        <h1 className='help__header'>How to play</h1>
        <p>User has 6 chances of guessing the given word.
          if he fails to guess the word he loses else he wins double the fee he paid.
        </p>
    </div>
  )
}

export default Help