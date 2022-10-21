//Register 

//Imports 
//Importation of React 
import React, {useState} from "react";
//Importation of axios 
//axios is a client library http that allows you to make request to a giving route 
import axios from "axios";
//importation of SigninForm for the connection 
import SignInForm from "./SigninForm";

//SignUp form 
const SignUpForm = ()=> {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setcontrolPassword] = useState('');

  const handleRegister =async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(".password-confirm.error");
    
    //put to 0 the error message 
    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword ){
      if (password !== controlPassword);
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res.data.errors);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  //Display 
  return (
  <>
  {formSubmit ? (
      <>
      <SignInForm/>
      <span></span>
      <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
      </>
        ) : (
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
              <br/>
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo (e.target.value)}
                value={pseudo}
              />
              <div className="pseudo error"></div>
              <br/>

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
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword (e.target.value)}
                value={password}
              />
              <div className="password error"></div>
              <br/>

              <label htmlFor="password-conf">Confirmer Mot de passe</label>
              <br/>
              <input
                type="password"
                name="password-conf"
                id="password-conf"
                onChange={(e) => setcontrolPassword (e.target.value)}
                value={controlPassword}
              />
              <div className="password-confirm error"></div>
              <br/>

            <input type="submit" value="Valider inscription"/>
          </form>
        )}
  </>
  )
}

//Exportation of SignUpForm
export default SignUpForm;