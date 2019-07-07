import axios from 'axios';

const instazApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

instazApi.interceptors.request.use(config => {
  const token = window.localStorage.getItem("jwt");
  if (token) {
    config.headers = Object.assign({
      Authorization: `Token ${token}`
    }, config.headers)
  }

  return config;
});

export default instazApi;
