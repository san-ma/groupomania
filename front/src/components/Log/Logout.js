//For disconnection 

//imports

//importation of react (library of  user interface construction)
import React from 'react'

//Importation of axios 
import axios from 'axios'

//importation of cookie to treat cookies 
import cookie from 'js-cookie';
// Allow to remove cookie and deconnecte
const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, {expires: 1});
        }
    };
    //Allow ro remove cookie from back 
    const logout = async () => {
        await axios ({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))

        window.location = "/";
    };
    //display
  return (
    <li onClick={logout}>
        <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout