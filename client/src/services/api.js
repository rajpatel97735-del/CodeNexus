import axios from "axios";

const API = axios.create({
  baseURL: "https://codenexus-56oh.onrender.com/api",
});

export default API;