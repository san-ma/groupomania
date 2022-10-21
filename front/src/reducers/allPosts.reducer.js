//Importation of all actions that concern posts
import { GET_ALL_POSTS } from "../actions/post.actions";
// State base empty 
const initialState = {};

//Exportation of allPostRuducer function who increase initialState with all the data 
//of all posts who are accessible by all the app components.
export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload
    default: 
      return state;
  }
}