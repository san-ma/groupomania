//Importation of axios 
//axios is a client library HTTP who allow to put some request to a given route. 
import axios from "axios";

//exportion of GET_USER for user data. 
export const GET_USER ="GET_USER";
//Exportation of UPLOAD_PICTURE for profile upload picture 
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
//Exportation of UPDATE_BIO for update the bio 
export const UPDATE_BIO = "UPDATE_BIO";
// Exportation of GET_USER_ERRORS for errors traitment 
export const GET_USER_ERRORS = "GET_USER_ERRORS"

/**
 * Allow to getting information of users
 * 
 * if everything is ok get the infos from API method get
 * @param {*} uid 
 * @returns If there is a mistake catch the error and log it 
 */
export const getUser = (uid) => {
    return (dispatch) => {
      return axios
      ({
        method: "get",
        url: (`${process.env.REACT_APP_API_URL}api/user/${uid}`),
        withCredentials : true,
      })
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

/**
 * Allow to upload an image for profile 
 * 
 * If everything is ok, uplaod image from API call method post 
 * @param {*} data 
 * @param {*} id 
 * @returns If there is a mistake catche the error and log it 
 */
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
    //sending data to backend
    ({
      method: "post",
      url:`${process.env.REACT_APP_API_URL}api/user/upload`,
      data: data,
      withCredentials : true,
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type : GET_USER_ERRORS, payload: res.data.errors})
        } else {
          dispatch({ type : GET_USER_ERRORS, payload: ''})
          return axios
          ({
            method: "get",
            url:(`${process.env.REACT_APP_API_URL}api/user/${id}`),
            withCredentials : true,
          })
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            }); 
          } 
      })
      .catch((err) => console.log(err));
  };
};


/**
 * updata user bio 
 * 
 * if everything is ok udpate bio from API call method put 
 * @param {*} userId 
 * @param {*} bio 
 * @returns If there is a mistake catch the mistake et log it 
 */
export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data:{ bio },
      withCredentials : true,
    })
      .then((res) => {
        dispatch({type: UPDATE_BIO, payload: bio })
      })
      .catch((err) => console.log(err))
  };
};