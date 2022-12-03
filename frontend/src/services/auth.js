import axios from "axios";

const API_URL = axios.create({
  baseURL: "http://ec2-3-143-238-200.us-east-2.compute.amazonaws.com",
  // baseURL: "http://restapi.adequateshop.com/api/authaccount/",

  headers: {
    "Content-Type": "application/json",
  },
});

const login = (email, password) => {
  return API_URL.post(`/login?email=${email}&password=${password}`).then(
    (response) => {
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
  );
};

const register = (
  username,
  password,
  email,
  firstname,
  lastname,
  address,
  optIntoPhyStatements
) => {
  return API_URL.post(
    `/signup?username=${username}&password=${password}&email=${email}
  &firstname=${firstname}
  &lastname=${lastname}
  &address=${address}
  &optIntoPhyStatements=${address}`,
    {
      username,
      password,
      email,
      firstname,
      lastname,
      address,
      optIntoPhyStatements,
    }
  );
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
