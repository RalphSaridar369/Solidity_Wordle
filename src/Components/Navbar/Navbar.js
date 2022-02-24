import React from 'react';
import './Navbar.css';

const Navbar = ({account}) => {
  return (
    <div className='navbar'>
        <div className='navbar__left'>
            <a href="/">Dashboard</a>
            <a href="/">Whitelist</a>
            <a href="/">Stake</a>
        </div>
        <div className='navbar__right'>
            <p>{account}</p>
        </div>
    </div>
  )
}

export default Navbar