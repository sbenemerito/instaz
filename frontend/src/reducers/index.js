import { combineReducers } from 'redux';

const postsReducer = (posts=[], action) => {
  if (action.type === 'FETCH_POSTS') {
    return action.payload.data;
  }

  return posts;
};

export default combineReducers({
  posts: postsReducer
});
