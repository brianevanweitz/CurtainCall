import axios from 'axios';

const baseUrl = 'http://localhost:3000'

// const api = axios.create({
//   baseURL: baseUrl
// })

// const getToken = () => {
//   const token = localStorage.getItem('jwt');
//   api.defaults.headers.common.authorization = `Bearer ${token}`;
// }

export const loginUser = async (loginData) => {
  const resp = await axios.post('http://localhost:3000/auth/login', loginData);
  return resp.data;
};

export const registerUser = async (registerData) => {
  const resp = await axios.post('http://localhost:3000/users/', registerData);
  return resp.data;
};
