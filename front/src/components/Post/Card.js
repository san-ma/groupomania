//Posts Cards 

//imports 

//Importation of React 
import React, { useEffect, useState } from "react";

//Importation of useSelector to get a value from store Redux. 
//Importation of Use Dispatch to get dispatch function to our composant 
import { useDispatch, useSelector } from "react-redux";
//Importation of isEmpty, function that determined if a value is empty or not. 
//Importation of dataParser(treatment of inscription data)
import { dateParser, isEmpty } from "../Utils";
//Importation of LikeButton
import LikeButton from "./LikeButton";
//Importation of UpdatePost (action)
import { updatePost } from "../../actions/post.actions";
//Importation of DeleteCard
import DeleteCard from "./DeleteCard";
//Importation of CardComments
import CardComment from "./CardComment";
//Importation spinner icons
import {  FaSpinner } from 'react-icons/fa';

// Affichage des posts
const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

//Display
//isLoading ? : sinon isLoading false and we display it 
  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <FaSpinner icon="fas fa-spinner fa-spin" className="fas fa-spinner fa-spin"/>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {userData._id === post.posterId && userData.admin === false && (
                <div className="button-container">
                    <div onClick={() => setIsUpdated(!isUpdated/* let when click to have the button and to remove it*/)}>
                        <img src="./img/icons/edit.svg" alt="edit"/>
                    </div>
                    <DeleteCard id={post._id} />
                </div>
             )}

            {userData.admin  === true &&(
                <div className="button-container">
                    <div onClick={() => setIsUpdated(!isUpdated/* Let click to have button et remove it*/)}>
                                <img src="./img/icons/edit.svg" alt="edit"/>
                    </div>
                    <DeleteCard id={post._id} />
                </div>
                    )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComment post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

//Exportation of card
export default Card;