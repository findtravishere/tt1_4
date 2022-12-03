import axios from "axios";

const API_URL = axios.create({
  baseURL: "http://restapi.adequateshop.com/api/authaccount/",
  headers: {
    Authorization: "Bearer <token>",
  },
});

const login = (email, password) => {
  return API_URL.post(`login`, {
    email,
    password,
  }).then((response) => {
    localStorage.setItem("user", JSON.stringify(response.data));
  });
};

const register = (username, password, email, firstname, lastname, address) => {
  return API_URL.post(`register`, {
    username,
    password,
    email,
    firstname,
    lastname,
    address,
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser,
};

export default AuthService;
