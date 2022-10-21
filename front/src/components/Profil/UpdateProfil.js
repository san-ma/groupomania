//Update user profil 

//Imports

//Importation of React 
import React from 'react';
//Importation of leftNav 
import LeftNav from '../LeftNav';
//Importation of useSelector to get a value from store Redux. 
//Importation of Use Dispatch to get dispatch function to our composant 
import { useDispatch, useSelector } from "react-redux";
//Importation of UploadImg
import UploadImg from './UploadImg';
import { useState } from 'react';
//Importation of updateBio (action)
import { updateBio } from '../../actions/user.action';
//Importation of dataParser (inscription date of user )
import { dateParser } from '../Utils';
// Update profile i
const  UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(false);
  }

  return (
    <div className='profil-container'>
        <LeftNav />
        <h1> Profil de {userData.pseudo}</h1>
        <div className='update-container'>
            <div className='left-part'>
                <h3>Photo de profil</h3>
                <img src={userData.picture} alt="user-pic" />
                <UploadImg />  
                <p>{error.format}</p>
            </div>
            <div className='right-part'>
              <div className='bio-update'>
                <h3>Bio</h3>
                {updateForm === false && (
                  <>
                    <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                    <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio
                    </button>
                  </>
                )}
                {updateForm && (
                  <>
                    <textarea 
                      type="text" 
                      defaultValue={userData.bio} 
                      onChange={(event) => setBio(event.target.value)}
                    ></textarea>
                    <button onClick={handleUpdate}>Valider modifications</button>
                  </>
                )}
              </div>
              <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
            </div>
        </div>
    </div>
  );
};

//Exportation of UpdateProfil
export default UpdateProfil;
