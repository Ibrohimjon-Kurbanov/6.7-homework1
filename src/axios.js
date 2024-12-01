import axios from "axios";

export const https = axios.create({
  baseURL: "https://auth-rg69.onrender.com/api/",
});
