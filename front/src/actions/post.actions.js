//Importation of axios 
//axios is a client library http that allows you to make request to a giving route 
import axios from 'axios';

// Exportation of posts actions (it's like library of actions) 
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST ="LIKE_POST";
export const UNLIKE_POST ="UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// Exportation of comments actions (it's like library of actions)
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// Exportation of GET_TRENDS actions tendance 
export const GET_TRENDS = "GET_TRENDS";

// Exportation of GET_POST_ERRORS for errors traitment. 
export const GET_POSTS_ERRORS = "GET_POSTS_ERRORS";

//Posts
// Get post getting a number (for infinite scroll) 
//action let to getting data of all posts and sending to reducer 
export const getPosts = (num) => {
  return (dispatch) => {
      return axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/post/`,
          withCredentials : true,
      })
      .then((res) => {
          const array = res.data.slice(0, num)  
          dispatch({ type: GET_POSTS, payload: array });
          dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err))
    };
};
// Action that let you to get back data of a "new post"
export const addPost = (data) => {
  return (dispatch) => {
      return axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/post/`,
          data: data, 
          withCredentials : true,
      })
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_POSTS_ERRORS, payload: res.data.errors })
          } else {
            dispatch({ type: GET_POSTS_ERRORS, payload: ''});
          }
        });
        
  };
}

/**
 * Allow a user to like a post by getting post url + id user who whants to like the post.
 * 
 * If everything is ok, allow like to post
 * @param {*} postId 
 * @param {*} userId 
 * @returns If there is a mistake catch error and log the error 
 */

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data: { id: userId },
      withCredentials : true,
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};


/**
 * Allow a user to unlike a post by getting post url + id user who whants to unlike the post.
 * 
 * If everything is ok, allow unlike of post 
 * @param {*} postId 
 * @param {*} userId 
 * @returns if there is a mistake catch error and log the error in question.
 */
export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data: { id: userId },
      withCredentials : true,
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

/**
 * Allow a user to update a post by getting post url and wants to update the post.
 * 
 * If everything is ok, allow update post.
 * @param {*} postId 
 * @param {*} message
 * @returns if there is a mistake catch the mistake and log it 
 */

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: {message},
      withCredentials : true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: {message, postId } });
      })
      .catch((err) => console.log(err));
  };
};

/**
 * Allaw you to delete a post by getting the post url who whants to delete the post. 
 * 
 * If everything is ok allow delete post 
 * @param {*} postId 
 * @returns if there is a mistake catch the error and log it. 
 */

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      withCredentials : true,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

/**
 * Allow a user to comment a post byt getting url post + user info of user who whant to comment the post 
 * 
 * If everything is ok, allow delete post 
 * @param {*} postId 
 * @param {*} commenterId 
 * @param {*} text 
 * @param {*} commenterPseudo 
 * @returns  if there is a mistake catch the error and log it 
 */

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      withCredentials : true,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        //mongoDB to a unique id per post 
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

/**
 * Allow users to modify a comment by getting post id of the comment + info of user who whants to edit the comment 
 *
 * If everything is ok, allow update comment. 
 * @param {*} postId 
 * @param {*} commentId 
 * @param {*} text 
 * @returns If there is a mistake catch the error et log it. 
 */

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
      withCredentials : true,
      data: { commentId, text },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

/**
 * Allow a user to delete a comment byt getting the post id of user who wants to delete the comment.
 *
 * If everything is ok allow delete comment. 
 * @param {*} postId 
 * @param {*} commentId 
 * @returns if there is a mistake catch the error and log it 
 */

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      withCredentials : true,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};

// Action that allow to get trends sorts data and send to reducer. 
export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};