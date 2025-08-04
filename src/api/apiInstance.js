import axios from "axios";

const apiInstance = axios.create({
  baseURL: `https://api.github.com/repos`,
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

export { apiInstance };
