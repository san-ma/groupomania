//Importation combineReducers that allow to organise our state by giving
//each part of the state to a under reducer different 
import { combineReducers } from "redux";
//Importation of userReducer 
import userReducer from "./user.reducer";
//Importation of userReducer 
import usersReducer from "./users.reducer";
//Importation of postReducer
import postReducer from "./post.reducer";
//Importation of errorReducer 
import errorReducer from "./error.reducer";
//Importation of allPostsReducer
import allPostsReducer from "./allPosts.reducer";
//Importation of trendingReducer
import trendingReducer from "./trending.reducer";

//Exportation by default of combinereducers (rootReducer in index.js)
export default combineReducers({
    userReducer,
    postReducer,
    usersReducer,
    errorReducer,
    allPostsReducer,
    trendingReducer

});