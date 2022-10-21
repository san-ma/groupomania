//To connect 

//imports 

//importation of React 
import React, {useState} from "react";

//Importation of axios 
//axios is a client library http that allows you to make request to a giving route 
import axios from 'axios';

/**
 * Signin Form 
 * @returns 
 */
const SignInForm = ()=> {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
        emailError.innerHTML = res.data.errors.email;
        passwordError.innerHTML = res.data.errors.passwordError;
        } else {
          window.location ='/';
        }
      })
        .catch ((err) => {
          console.log(err);
        })
  };
  
  //display 
  return (
    <form action = "" onSubmit={handleLogin} id = "sign-up-form">

      <label htmlFor="email">Email</label>
        <br/>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail (e.target.value)}
          value={email}
        />
        <div className="email error"></div>
        <br/>

      <label htmlFor="password">Mot de passe</label>
        <br/>
        <input type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword (e.target.value)}
          value={password}
        />
        <div className="password error"></div>
        <br/>

      <input type="submit" value="Se connecter" />
    </form>
    
    
  );
}

//Exportation of SignInForm
export default SignInForm;