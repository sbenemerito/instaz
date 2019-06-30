import instazApi from '../utils/InstazApi';

const fetchPosts = () => async dispatch => {
  const response = await instazApi.get('/posts');

  dispatch({
    type: 'FETCH_POSTS',
    payload: response
  });
};

export { fetchPosts };
