import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // set the Authorization header with the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // remove the Authorization header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
