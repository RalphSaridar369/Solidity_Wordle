import React, { useContext } from 'react';
import { MainContext } from '../../MainContext';
import { Home, DashboardOutlined, Help, Add} from '@mui/icons-material'
import { Link } from 'react-router-dom';
import './Drawer.css';
import { divideBy } from '../../helpers';

const Drawer = () => {
    const { drawerOpen, owner, account, price } = useContext(MainContext)
    return (
        <div className='drawer'
            style={{
                width: !drawerOpen ? '0px' : '250px'
            }}>
            <div className="drawer__content"
            style={{
                opacity: !drawerOpen?0:1
            }}>
                <div className='drawer__content__price'>
                    <p>Fee: {divideBy(price.fee)} ETH</p>
                </div>

                <Link to="/" className='drawer__content__item'>
                    <Home style={{fontSize:32, color:'#fff', marginRight:'30px'}}/>
                    <p className='drawer__content__item__header'>Home</p>
                </Link>
                {account == owner && <Link to="/create" className='drawer__content__item'>
                    <Add style={{fontSize:32, color:'#fff', marginRight:'30px'}}/>
                    <p className='drawer__content__item__header'>Create</p>
                </Link>}
                <Link to="/help" className='drawer__content__item'>
                    <Help style={{fontSize:32, color:'#fff', marginRight:'30px'}}/>
                    <p className='drawer__content__item__header'>How to play</p>
                </Link>
            </div>
        </div>
    )
}

export default Drawer