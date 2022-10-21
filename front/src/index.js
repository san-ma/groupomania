//Imports 

//Importation of React 
import React from 'react';

//Importation of ReactDOM 
import ReactDOM from 'react-dom/client';
//Importation of app 
import App from './App';
// Import of style of web site 
import './styles/index.scss';
//importation of assitance provider function throught react-redux package
import { Provider } from 'react-redux';
//importation of store 
//importation of apply middleware redux 
//let you change the store functions 
//for exemple let you to add a logging system
//or to manipulate more easely asynchrone actions

//importation applyMiddleware (store amplicators)
//enrich the store by adding a sort of hook on dispath method
import { applyMiddleware, legacy_createStore } from '@reduxjs/toolkit';
//Importation of thunk 
import thunk from 'redux-thunk';
//importation of rootReducer (where they are all the reducers)
//allow to import many combined reductors 
//in one (with combineReducers) for the gestion of state.
import rootReducer from './reducers';
//Importation of request(actions) treated with AXIOS users and posts 
import { getUsers } from "./actions/users.actions";
import { getPosts } from './actions/post.actions';

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';


// Creation of store
//composewithdevtools : remove the production mode 
const store = legacy_createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

//dispacth trigger the reductor and execute the task
//for all users 
store.dispatch(getUsers());
//for all posts
store.dispatch(getPosts());


//we enveloppe our componant app with provider
//we pass to props the store who has our actual store value
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


