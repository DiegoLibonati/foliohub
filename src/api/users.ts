import axios from "axios";

export const apiUsers = axios.create({
  baseURL: "/users",
  timeout: 5000,
});
