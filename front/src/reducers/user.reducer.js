import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.action";
// Reducer user
const initialState = {};

//Exportation of userReducer function who increment the initialState with all the data
//who whill be accesibles by all the app components
//..State who let getting back the data already existant (who let not crush 
//the data when we send bu when we "complete")
export default function userReducer(state = initialState, action) {
   switch (action.type) {
    case GET_USER:
        return action.payload;
    case UPLOAD_PICTURE:
        return {
            ...state,
            picture: action.payload,
        };
    case UPDATE_BIO:
        return {
            ...state,
            bio: action.payload,
        };
    default:
        return state;
   } 
}