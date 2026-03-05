import { create } from "zustand";
import { apiInstance } from "../api/apiInstance";

export const useGithubStore = create((set) => ({
  isLoading: false,
  error: null,
  repoInfo: null,
  contributors: [],
  languages: {},
  issues: [],
  commitActivity: [],

  loadRepoData: async (username, repoName) => {
    set({ isLoading: true, error: null });

    try {

      // Parallel API Requests
      const [repoRes, contributorsRes, languagesRes, issuesRes] =
        await Promise.all([
          apiInstance.get(`/${username}/${repoName}`),
          apiInstance.get(`/${username}/${repoName}/contributors`),
          apiInstance.get(`/${username}/${repoName}/languages`),
          apiInstance.get(`/${username}/${repoName}/issues?per_page=10`),
        ]);

      let commitActivity = [];

      // commit activity endpoint sometimes fails
      try {
        const commitRes = await apiInstance.get(
          `/${username}/${repoName}/stats/commit_activity`
        );
        commitActivity = commitRes.data || [];
      } catch (err) {
        console.warn("Commit activity not available");
      }

      set({
        repoInfo: repoRes.data,
        contributors: contributorsRes.data,
        languages: languagesRes.data,
        issues: issuesRes.data,
        commitActivity,
        isLoading: false,
      });

    } catch (error) {

      console.error("GitHub API Error:", error);

      set({
        isLoading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        repoInfo: null,
        contributors: [],
        languages: {},
        issues: [],
        commitActivity: [],
      });
    }
  },

  clearData: () =>
    set({
      repoInfo: null,
      contributors: [],
      languages: {},
      issues: [],
      commitActivity: [],
      error: null,
    }),
}));