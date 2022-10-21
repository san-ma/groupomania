import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/icons/logo.jpg';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
import { useSelector } from 'react-redux';

// Principal nav header 
const  Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
         <NavLink  to="/">
          <div className='logo'>
            <img src={logo} alt='icon'/>
            <h3>Groupomania</h3>
          </div>
         </NavLink> 
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className='welcome'>
              <NavLink to="/profil">
                <h5>Bienvenue {userData.pseudo}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profil">
                <img src='./img/icons/login.jpg' alt='icons-left'/>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar;