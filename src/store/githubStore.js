import { create } from "zustand";
import { apiInstance } from "../api/apiInstance";

const useGithubStore = create((set) => ({
  isLoading: false,
  error: null,
  repoInfo: null,
  contributors: [],
  languages: {},
  issues: [],
  commitActivity: [],
  loadRepoData: async function (username, repoName) {
    // console.log(username);
    // console.log(repoName);
    set({ isLoading: true, error: null });
    try {
      const [repoInfo, contributors, languages, issues, commitActivity] =
        await Promise.all([
          await apiInstance
            .get(`/${username}/${repoName}`)
            .then((res) => res.data),
          await apiInstance
            .get(`/${username}/${repoName}/contributors`)
            .then((res) => res.data),
          await apiInstance
            .get(`/${username}/${repoName}/languages`)
            .then((res) => res.data),
          await apiInstance
            .get(`/${username}/${repoName}/issues`)
            .then((res) => res.data),
          await apiInstance
            .get(`/${username}/${repoName}/stats/commit_activity`)
            .then((res) => res.data),
        ]);
      set({
        repoInfo,
        contributors,
        languages,
        issues,
        commitActivity,
        isLoading: false,
      });
    } catch (error) {
      alert("something is wrong");
      console.log("Error while fetching data", error);
      set({
        isLoading: false,
        error: error.message || "Something went wrong try again",
        repoInfo: null,
        contributors: [],
        languages: {},
        issues: [],
        commitActivity: [],
      });
    }
  },
  clearData: () => {
    set({
      username: "",
      repoName: "",
      repoInfo: null,
      contributors: [],
      languages: {},
      issues: [],
      commitActivity: [],
    });
  },
}));

export { useGithubStore };
