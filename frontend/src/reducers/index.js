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

  if (action.type === 'ADD_COMMENT') {
    return posts.map(post => {
      if (post.id === action.payload.post) {
        post.comments.push(action.payload);
      }

      return post;
    });
  }

  if (action.type === 'EDIT_POST') {
    let temporaryPosts = [];
    posts.forEach(post => {
      if (post.id === action.payload.id) {
        if (action.payload.is_active) temporaryPosts.push(action.payload);
      } else {
        temporaryPosts.push(post);
      }
    });

    return temporaryPosts;
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
  } else {
    errorMessages = [];
  }

  return errorMessages;
};

const viewPostReducer = (currentPost=null, action) => {
  // React does a shallowEqual on state changes to determine if the component
  // should be re-rendered. By cloning the object, we create a different reference.
  // This variable will be used for times that the currentPost will be manipulated.
  let currentPostCopy = currentPost === null ? null : { ...currentPost };

  if (action.type === 'VIEW_POST') {
    return action.payload;
  }

  if (action.type === 'TOGGLE_POST_LIKE') {
    if (currentPost !== null && currentPost.id === action.payload.postId) {
      currentPostCopy.is_liked = !currentPostCopy.is_liked;
      currentPostCopy.likes = currentPostCopy.is_liked
                              ? currentPostCopy.likes + 1
                              : currentPostCopy.likes - 1;
    }
  }

  if (action.type === 'ADD_COMMENT') {
    if (currentPost !== null && currentPost.id === action.payload.post) {
      currentPostCopy.comments.push(action.payload);
    }
  }

  if (action.type === 'EDIT_POST' && currentPost !== null) {
    if (currentPost.id === action.payload.id) {
      if (!action.payload.is_active) return null;
      else return action.payload;
    }
  }

  if (action.type === 'ADD_POST') {
    currentPostCopy = action.payload;
  }

  currentPost = currentPostCopy;
  return currentPost;
};

export default combineReducers({
  posts: postsReducer,
  currentPost: viewPostReducer,
  currentUser: authReducer,
  errorMessages: errorsReducer,
});
