import axios from 'axios';

export const login = async (email: string, password: string) => {
  return axios.post('http://127.0.0.1:5000/login', {
    email,
    password
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const register = async (username: string, email: string, password: string, confirmPassword: string) => {
  return axios.post('http://127.0.0.1:5000/register', {
    username,
    email,
    password,
    confirm_password: confirmPassword
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};
