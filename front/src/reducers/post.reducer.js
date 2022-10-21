import { DELETE_COMMENT, DELETE_POST, EDIT_COMMENT, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "../actions/post.actions";
// Reducers des posts
const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            //identifie the message who is liked.
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                //change the table of like wihout crushing the data 
                return {
                    ...post,
                    likers: [action.payload.userId, ...post.likers],
                };
                }
                return post;
            });
        
        case UNLIKE_POST:
            //Identifie the message who is unliked 
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                 //change the table of like wihout crushing the data 
                return {
                    ...post,
                    likers: post.likers.filter((id) => id !== action.payload.userId),
                };
                }
                return post;
            });
        
        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message
                    };
                } else return post;
            });

        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId);

        case EDIT_COMMENT:
            return state.map((post) => {
                if (post._id === action.payload.postId){
                    return {
                        ...post,
                        comments: post.comments.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text
                                }
                            } else {
                                return comment
                            }
                        })
                    }
                } else return post;
            });

        case DELETE_COMMENT :
            return state.map((post) => {
                if(post._id === action.payload.postId) {
                return {
                    ...post,
                    comments: post.comments.filter((comment) => comment._id !== action.payload.commentId)
                }
                } else return post
            });
        default: 
            return state;
    };
};