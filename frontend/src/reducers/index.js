import { combineReducers } from 'redux';

const postsReducer = (posts=[], action) => {
  if (action.type === 'FETCH_POSTS') {
    return action.payload.data;
  }

  if (action.type === 'TOGGLE_POST_LIKE') {
    return posts.map(post => {
      if (post.id === action.payload.postId) {
        post.is_liked = !post.is_liked;
        post.likes = post.is_liked ? post.likes + 1 : post.likes - 1;
      }

      return post;
    });
  }

  return posts;
};

const authReducer = (currentUser=null, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
    case 'NEW_USER':
      return action.payload;
    case 'LOGOUT_USER':
      return null;
    default:
      return currentUser;
  }
};

const errorsReducer = (errorMessages=[], action) => {
  if (action.type.includes('FAILURE')) {
    if (typeof action.payload === 'string') {
      errorMessages = [action.payload];
    } else {
      let tempErrors = [];
      Object.keys(action.payload).forEach(errorKey => {
        if (typeof action.payload[errorKey] === 'string') {
          tempErrors.push(action.payload[errorKey]);
        } else {
          tempErrors = tempErrors.concat(action.payload[errorKey] || []);
        }
      });

      errorMessages = tempErrors;
    }
  }

  return errorMessages;
};

const viewPostReducer = (currentPost=null, action) => {
  if (action.type === 'VIEW_POST') {
    return action.payload;
  }

  if (action.type === 'TOGGLE_POST_LIKE') {
    if (currentPost !== null && currentPost.id === action.payload.postId) {
      // React does a shallowEqual on state changes to determine if the component
      // should be re-rendered. By cloning the object, we create a different reference
      let currentPostCopy = Object.assign({}, currentPost);
      currentPostCopy.is_liked = !currentPostCopy.is_liked;
      currentPostCopy.likes = currentPostCopy.is_liked
                              ? currentPostCopy.likes + 1
                              : currentPostCopy.likes - 1;
      currentPost = currentPostCopy;
    }
  }

  return currentPost;
};

export default combineReducers({
  posts: postsReducer,
  currentPost: viewPostReducer,
  currentUser: authReducer,
  errorMessages: errorsReducer,
});
