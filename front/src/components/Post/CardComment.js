//Post comment 

//Import 

//Importation of React 
import React, { useState } from "react";
//Importation of useSelector to get a value from store Redux. 
//Importation of Use Dispatch to get dispatch function to our composant 
//so we can dispatch actions redux 
import { useDispatch, useSelector } from "react-redux";

//Importation of addcomment and getPosts(action)
import { addComment, getPosts } from "../../actions/post.actions";
//Importation of isEmpty, function that determined if a value is empty or not. 
//Importation of dataParser(treatment of inscription data)
import { isEmpty, timestampParser } from "../Utils";
//Importation of EditDeletcomment
import EditDeleteComment from "./EditDeleteComment";
 // Display of comments part 
const CardComments = ({post})=> {
    const [text, setText] = useState("")
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.pseudo))
            .then(() => dispatch(getPosts()))
            //put the comment variable empty to write again.
            .then(() => setText(''))
        }
    }

//Display 

    return (
        <div className="comments-container">
          {post.comments.map((comment) => {
            return (
                <div
                    className={
                    comment.commenterId === userData._id
                        ? "comment-container client"
                        : "comment-container"
                    }
                    key={comment._id}
                >
                    <div className="left-part">
                        <img //When we click on "comment" image whe have display comments 
                            src={
                            !isEmpty(usersData[0]) &&
                            usersData
                                .map((user) => {
                                if (user._id === comment.commenterId) return user.picture;
                                else return null;
                                })
                                .join("")
                            }
                            alt="commenter-pic"
                        />
                    </div>
                    <div className="right-part">
                        <div className="comment-header">
                            <div className="pseudo">
                                <h3>{comment.commenterPseudo}</h3>
                            </div>
                            <span>{timestampParser(comment.timestamp)}</span>
                        </div>
                        <p>{comment.text}</p>
                      <EditDeleteComment comment={comment} postId={post._id}/>
                    </div>
                </div>
            )
        })}
        {userData._id && (
            <form action="" onSubmit={handleComment} className="comment-form">
                <input type="text" 
                    onChange={(e) => setText(e.target.value)} 
                    value={text} 
                    placeholder="Laisser un commentaire"
                />
                <br/>
                <input type="submit" value="Envoyer"/>
            </form>
        )}
      </div>
  )
}

//Exportation CardComments
export default CardComments;