//form post for new posts
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils';
import {  FaSpinner } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from "../../actions/post.actions";

// Nouveau post 
const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  // image display on front  
  const [postPicture, setPostPicture] = useState(null);      
  const [video, setVideo] = useState('');
  // image passed to data base
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();


  const handlePost = async () => {
    if (message || postPicture || video) {
        const data = new FormData();
        data.append('posterId', userData._id);
        data.append('message', message);
        if (file) data.append("file", file);
        data.append('video', video);

        //Send info to back 
        await dispatch(addPost(data));
        dispatch(getPosts());
        cancelPost();
    } else {
        alert("Veuillez entrer un message")
    }
};
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo('');
  };

  
  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setVideo('');
    setFile('');
  };
// Youtube video reading to network 
  const handleVideo = () => {
    let findLink = message.split(" ");
    for (let i = 0; i < findLink.length; i++) {
        if (
            findLink[i].includes('https://www.yout') || 
            findLink[i].includes('https://yout')
            ) {
            let embed = findLink[i].replace('watch?v=', "embed/");
            setVideo(embed.split('&')[0]);
            findLink.splice(i, 1);
            setMessage(findLink.join(" "));
            setPostPicture('');
        }
    }
  };
  handleVideo();

 useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    
  }, [userData, message, video,])

  return (
    <div className='post-container'>
        {isLoading ? (
            <FaSpinner icon="fas fa-spinner fa-pulse" className='fas fa-spinner fa-pulse'/>
        ) : (
           <>
            <NavLink to='/profil'> 
                <div className='user-info'>
                    <img src={userData.picture} alt='user-img' />
                </div>
            </NavLink>
            <div className='post-form'>
                <textarea 
                  name='message'
                  id='message'
                  placeholder='Quoi de neuf ?'
                  onChange={(e) => setMessage(e.target.value)}
                  value={message} 
                />
                {message || postPicture || video.length > 20 ? (
                    <li className='card-container'>
                        <div className='card-left'>
                            <img src={userData.picture} alt='user-pic'/>
                        </div>
                        <div className='card-right'>
                            <div className='card-header'>
                                <div className='pseudo'>
                                   <h3>{userData.pseudo}</h3> 
                                </div>
                                <span>{timestampParser(Date.now())}</span>
                            </div>
                            <div className='content'>
                               <p>{message}</p> 
                               <img src={postPicture} alt=''/>
                               {video && (
                                <iframe
                                    src={video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={video}
                                ></iframe>
                               )}
                            </div>
                        </div>
                    </li>
                ) : null}
                <div className='footer-form'>
                    <div className='icon'>
                        {isEmpty(video) && (
                            <>
                                <img src='./img/icons/picture.svg' alt='img'/>
                                <input 
                                    type="file" 
                                    id='file-upload' 
                                    name='file' 
                                    accept='.jpg, .jpeg, .png' 
                                    onChange={(e) => handlePicture(e)}
                                />
                            </>
                        )}
                        {video && (
                            <button onClick={() => setVideo("")}>Supprimer video</button>
                        )}
                    </div>
                    {!isEmpty(error.format) && <p>{error.format}</p>}
                    {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
                    <div className='btn-send'>
                    {/* Display only "cancel message" if a post is created */}
                    {message || postPicture || video.length > 20 ? (
                        <button className='cancel' onClick={cancelPost}>Annuler message</button>
                    ) : null}
                        <button className='send' onClick={handlePost}>Envoyer</button>
                    </div>
                </div>
            </div>
           </>
        )}
    </div>
  );
};

export default NewPostForm