//Delete a post 

//Importation of React 
import React from "react";

//Importation of Use Dispatch to get dispatch function to our composant 
import { useDispatch } from "react-redux";
//Importation of deletePost(action)
import { deletePost } from "../../actions/post.actions";
// Display of option delete 
//the propos deletecard contain only prosp .id 
const DeleteCard = (props)=> {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch (deletePost(props.id))
//Display
  return (
      <div onClick={() => {
        if (window.confirm('Voulez-vous supprimer ce Post ?')) {
            deleteQuote();
        }
      }}>
       <img src="./img/icons/trash.svg" alt="trash" />
      </div>
  )
}
//Exportation DeleteCard
export default DeleteCard;