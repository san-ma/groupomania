//Imports 

//Importation of React whit useState and useEffect :
//useState (State Hook) allow to add a local React state to composants functions

//useEffect (Hook effect) allow to execute side effect in composants functions

//the hooks are function that allow to "connect"
//to the local state gestion and the live cycle of React from composants function 
import React, {useEffect, useState} from "react";

//Importation of UidContext
//the context offer a way to pass the data through the tree of composant
//wihout having to pass manually all props to each lever 
//allow to stock user Id
import { UidContext } from "./components/AppContext";
//Importation of routes(navigation)
import Routes from "./components/Routes";
//Importation of axios
import axios from "axios"

//importation of useDispatch who allow to get back the function dispatch
//in our composant so that we can dispacth the Redux actions
import { useDispatch } from "react-redux";
//Importation of action get user to have the user data 
import { getUser } from "./actions/user.action";

//declation of the funciton App
const App = ()=> {
  const[uid, setUid] = useState(null);
  const dispatch = useDispatch();
//control of id token each time we call the app
//check the user Id
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials:true,
      })
      .then((res) => {
        setUid(res.data)
      })
      .catch((err) => console.log("No Token"))
    }
    fetchToken();

    if(uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

//exportation of APP
export default App;
