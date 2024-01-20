import React , {useContext}from 'react'
import './css/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
// import { Avatar } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import { AuthContext } from '../../App';
import {
  signOut
} from "firebase/auth";
import { auth } from '../../firebase.js'; 

function Header() {

  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <header>
      <div className='header-container'>
      <div className='header-left'>
      <Link to='/'>
        <img src=" " alt='logo' />
      </Link>
        <h3>Products</h3>

      </div>
      <div className='header-middle'>
        <div className='header-search-container'>
          <SearchIcon/>
          <input type='text' placeholder='Search...' />

        </div>
      </div>
      <div className='header-right'>
        <div className='header-right-container'>
        {user ? (
              <>
                <Avatar backgroundColor='#009dff' px="10px" py="15px" borderRadius="50%" color="white">
                  <Link to='/user' style={{ color: 'white', textDecoration: 'none' }}>y</Link>
                </Avatar>
                <Link onClick={handleLogout} className='nav-item nav-links'>Log out</Link>
              </>
            ) : (
              <Link to='/auth' className='nav-item nav-links'>Log In</Link>
            )}
         
          <InboxIcon />
          <svg
              aria-hidden="true"
              class="svg-icon iconStackExchange"
              width="24"
              height="24"
              viewBox="0 0 18 18"
              fill="rgba(0,0,0,0.5)"
              style={{
                cursor: "pointer",
              }}
            >
              <path d="M15 1H3a2 2 0 00-2 2v2h16V3a2 2 0 00-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 002-2v-2H1v2Zm16-7H1v4h16V6Z"></path>
            </svg>

        </div>
      </div>
      </div>
    </header>
  )
}

export default Header
