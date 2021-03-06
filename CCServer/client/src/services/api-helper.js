import axios from 'axios';

const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})


//Auth
const getToken = () => {
  const token = localStorage.getItem('jwt');
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData);
  return resp.data;
};

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData });
  return resp.data;
};

//User calls
export const getUsers = async () => {
  getToken();
  const resp = await api.get('/users')
  return resp.data;
}
export const showUser = async (id) => {
  getToken();
  const resp = await api.get(`/users/${id}`);
  return resp.data;
};

export const updateUser = async (id, userData) => {
  getToken();
  const resp = await api.put(`/users/${id}`, { user: userData });
  return resp.data;
};

//Swipe calls
export const addSwipe = async (id, data) => {
  getToken();
  const resp = await api.post(`/users/${id}/swipes`, data);
  return resp.data;
};

//Match calls
export const getMatches = async (id) => {
  getToken();
  const resp = await api.get(`/users/${id}/matches`);
  return resp.data
};

export const addMatch = async (id, data) => {
  getToken();
  const resp = await api.post(`/users/${id}/matches`, data);
  return resp.data;
};

export const deleteMatch = async (userId, id) => {
  getToken();
  await api.delete(`/users/${userId}/matches/${id}`);
};

//Message calls
export const getMessages = async (userId, targetUserId) => {
  getToken();
  const resp = await api.get(`/users/${userId}/messages/target/${targetUserId}`);
  return resp.data;
};

export const createMessage = async (userId, data) => {
  getToken();
  const resp = await api.post(`/users/${userId}/messages`, data);
  return resp.data;
}

