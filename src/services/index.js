import axios from "axios";

const api = axios.create({
  baseURL: "https://follow-kenzie.herokuapp.com/api/",
});

export default api;
