//Upload of profile image 

//Imports 

//Importation of React 
import React, { useState } from "react";
//Importation of useSelector to get a value from store Redux. 
//Importation of Use Dispatch to get dispatch function to our composant 
import { useDispatch, useSelector } from "react-redux";
//Importation of UploadPicture (actions)
import { uploadPicture } from "../../actions/user.action";

const UploadImg = () => {
  
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  //We get on the store all userData 
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    //append to add table content 
    //or add a key if she don't exist
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
//dispatch to dispatch an action, a changment state (redux) 
    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

//Exportation of UploadImg
export default UploadImg;