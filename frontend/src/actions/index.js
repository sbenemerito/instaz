import instazApi from '../utils/InstazApi';

const fetchPosts = () => async dispatch => {
  const response = await instazApi.get('/posts');

  dispatch({
    type: 'FETCH_POSTS',
    payload: response
  });
};

const loginUser = userData => async dispatch => {
  await instazApi.post('/users/auth/login/', {...userData}).then(
    response => {
      dispatch({
        type: 'LOGIN_USER',
        payload: response.data
      });
    },
    error => {
      dispatch({
        type: 'LOGIN_USER_FAILURE',
        payload: error.response ? error.response.data : error.message
      });
    }
  );
};

const registerUser = userData => async dispatch => {
  await instazApi.post('/users/auth/signup/', { ...userData }).then(
    response => {
      dispatch({
        type: 'NEW_USER',
        payload: response.data
      });
    },
    error => {
      dispatch({
        type: 'NEW_USER_FAILURE',
        payload: error.response ? error.response.data : error.message
      });
    }
  );
};

const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  };
};

const likePost = (postId) => async dispatch => {
  await instazApi.post(`/posts/${postId}/like/`).then(
    response => {
      dispatch({
        type: 'TOGGLE_POST_LIKE',
        payload: { postId }
      });
    },
    error => {
      dispatch({
        type: 'TOGGLE_POST_LIKE_FAILURE',
        payload: error.response ? error.response.data : error.message
      });
    }
  );
};

const viewPost = (postId) => async dispatch => {
  await instazApi.get(`/posts/${postId}/`).then(
    response => {
      dispatch({
        type: 'VIEW_POST',
        payload: response.data
      });
    },
    error => {
      dispatch({
        type: 'VIEW_POST_FAILURE',
        payload: error.response ? error.response.data : error.message
      });
    }
  );
};

const addComment = ({ post, message }) => async dispatch => {
  await instazApi.post('/comments/', { post, message }).then(
    response => {
      dispatch({
        type: 'ADD_COMMENT',
        payload: response.data
      });
    },
    error => {
      dispatch({
        type: 'ADD_COMMENT_FAILURE',
        payload: error.response ? error.response.data : error.message
      });
    }
  );
};

const addPost = ({ image, caption }) => async dispatch => {
  const postData = new FormData();
  postData.append('image', image);
  postData.append('caption', caption);

  await instazApi.post(
    "/posts/",
    postData,
    { headers: { 'content-type': 'multipart/form-data' }}).then(
    response => {
      dispatch({
        type: 'ADD_POST',
        payload: response.data
      });
    },
    error => {
      dispatch({
        type: 'ADD_POST_FAILURE',
        payload: error.response ? error.response.data : error.message
      });
    }
  );
};

export {
  addComment, addPost, fetchPosts, likePost,
  loginUser, registerUser, logoutUser, viewPost
};
