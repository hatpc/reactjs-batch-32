import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: "https://batch-293-0-nodejs.onrender.com", // Main domain
  headers: { "Content-Type": "application/json" },
});
