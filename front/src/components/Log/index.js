// Registration and connection of "home" page 

//imports
//importation of react (library of interface construction user)
import React, { useState } from 'react'

//importation of SigninForm for connection
import SigninForm from './SigninForm';

//importation of SingupForm for connection
import SignupForm from './SignupForm';

const Log = ( props ) => {
  //conditionnal display with hooks and props 
  //Inscription (display of different function of home page or trend page)
  const [signUpModal, setSignUpModal]  = useState(props.signup); 
  //Connection (display of different function of home page or trend page )
  const [signInModal, setSignInModal]  = useState(props.signin); 

  //function to manage components signin and signup 
  const handleModals = (event) => {
    if (event.target.id === "register") {
        setSignInModal(false);
        setSignUpModal(true);
    } else if (event.target.id === "login") {
        setSignInModal(true);
        setSignUpModal(false);
    }
  }

  //Display
  //condition to displaut or model inscription or connection 
  return (
    <div className='connection-form'>
        <div className='form-container'>
            <ul>
                <li 
                    onClick={handleModals} 
                    id="register" 
                    className={signUpModal ? "active-btn" : null}
                    >
                    S'inscrire
                </li>
                <li 
                    onClick={handleModals} 
                    id="login" 
                    className={signInModal ? "active-btn" : null}
                    >
                    Se connecter
                </li>
            </ul>
            {signUpModal && <SignupForm />}
            {signInModal && <SigninForm />}
        </div>
    </div>
  );
};

//exportation of log 
export default Log