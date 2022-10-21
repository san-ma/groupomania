//Importation of axios 
//axios is a client library http that allows you to make request to a giving route 
import axios from "axios";

//Exportation of GET_USERS for data of all users
export const GET_USERS = "GET_USERS";

//Action that allow to get the data of all users and send it to reducer
export const getUsers = () => {
  return (dispatch) => {
    return axios.request
    ({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user`,
      withCredentials : true,
    })
      .then((res) => {
        dispatch({ 
          type: GET_USERS,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
};