//Importation of action GET_USERS
import { GET_USERS } from "../actions/users.actions";
// Reducer of all users 
const initialState = {};

//Exportation of userReducer function who increment the initialState with all the data
//who whill be accesibles by all the app components
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}