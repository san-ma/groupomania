//Delete comment or edit 

//Imports 
//Importation of react 
import React, { useContext, useEffect, useState } from "react";
//Importation de UidContext
//Le Contexte offre un moyen de faire passer des données à travers l’arborescence du composant
import { useDispatch, useSelector } from "react-redux";
//Importation of deleteComment and editComment (action)
import { deleteComment, editComment } from "../../actions/post.actions";
//wihout pass manually all props to each level 
//allow to stock user Id
import { UidContext } from "../AppContext";
// Display of modify/delete comment part 
const EditDeleteComment = ({ comment, postId})=> {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userReducer);//store of administrator 

    const handleEdit = (e) => {
        e.preventDefault();

        if(text) {
            dispatch(editComment(postId, comment._id, text));
            setText('');//we put the text to 0
            setEdit(false);
        }
    }

    const handleDelete = () => dispatch(deleteComment(postId, comment._id));

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
            setIsAuthor(true)//We have our display who appeared (verification of user) 
            }
        };
        checkAuthor();
    }, [uid, comment.commenterId]);

  return (
      <div className="edit-comment">
        {isAuthor && edit === false && userData.admin === false && (
            <span onClick={() => setEdit (!edit)}>
                <img src="./img/icons/edit.svg" alt="edit-comment" />
            </span>
        )}

        { userData.admin === true && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
        )}

        {isAuthor && edit && userData.admin === false &&  (
            <form action="" onSubmit={handleEdit}
                className="edit-comment-form">
                <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                <br/>
                    <input 
                        type="text" 
                        name="text" 
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                    />
                <br/>
                <div className="btn">
                    <span onClick={ () => {
                        if (window.confirm("Voulez-vous supprimer ce commentaire")
                        ) {
                            handleDelete();
                        }
                        }}>
                        <img src="./img/icons/trash.svg" alt="delete"/>
                    </span>
                    <input type="submit" value="Valider modification" />
                </div>
            </form>
        )}

        {userData.admin === true && edit && (
            <form action="" onSubmit={handleEdit}
                className="edit-comment-form">
                <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                <br/>
                    <input 
                        type="text" 
                        name="text" 
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                    />
                <br/>
                <div className="btn">
                    <span onClick={ () => {
                        if (window.confirm("Voulez-vous supprimer ce commentaire")
                        ) {
                            handleDelete();
                        }
                        }}>
                        <img src="./img/icons/trash.svg" alt="delete"/>
                    </span>
                    <input type="submit" value="Valider modification" />
                </div>
            </form>
        )}
      </div>
    
  )
}
//Exportation 
export default EditDeleteComment;