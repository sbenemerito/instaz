import instazApi from '../utils/InstazApi';

const fetchPosts = () => async dispatch => {
  const response = await instazApi.get('/posts');

  dispatch({
    type: 'FETCH_POSTS',
    payload: response
  });
};

const loginUser = userData => async dispatch => {
  const response = await instazApi.post('/users/auth/login/', {...userData}).then(
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
  const response = await instazApi.post('/users/auth/signup/', { ...userData }).then(
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

export { fetchPosts, loginUser, registerUser };
