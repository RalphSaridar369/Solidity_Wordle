import React, { useContext } from 'react';
import Identicon from 'react-identicons';
import { MainContext } from '../../MainContext';
import { MenuOutlined } from '@mui/icons-material';
import './Header.css'

const Header = () => {
    const { account, drawerOpen, setOpenDrawer } = useContext(MainContext)
    return (
        <div className='header'>
            <div className='header__icon'
                onClick={() => setOpenDrawer(!drawerOpen)}>
                <MenuOutlined style={{ color: 'white', fontSize: 40 }} />
            </div>
            <div className="header__account">
                {account && <><p className='header__account__address'>{account}</p>
                    <Identicon string={account} size={30} palette={["#fff"]} /></>}
            </div>
        </div>
    )
}

export default Header