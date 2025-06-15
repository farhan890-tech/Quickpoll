import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust as needed
});

export const createPoll = (data) => API.post("/polls", data);
export const getPoll = (id) => API.get(`/polls/${id}`);
export const votePoll = (id, optionIndex) =>
  API.post(`/polls/${id}/vote`, { optionIndex });
