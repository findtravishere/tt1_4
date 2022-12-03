import axios from "axios";

// TODO: Add API once ready
const API_URL = axios.create({
  baseURL: "http://ec2-3-143-238-200.us-east-2.compute.amazonaws.com/",
  headers: {
    Authorization: "Bearer <token>",
    "Content-type": "application/json",
  },
});

const update = (id, data) => {
  return API_URL.put(`/${id}`, data);
};

const getUserId = (id) => {
  return API_URL.get(`users/by-id/${id}`);
};

const UserService = {
  getUserId,
  update,
};

export default UserService;
