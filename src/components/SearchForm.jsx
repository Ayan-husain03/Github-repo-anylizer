import React from "react";
import { useState } from "react";
import { useGithubStore } from "../store/githubStore";
import { Search } from "lucide-react";
import { Github } from "lucide-react";
import { User } from "lucide-react";
import { GithubIcon } from "lucide-react";

function SearchForm() {
  const [formData, setFormData] = useState({
    username: "",
    repoName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { loadRepoData, clearData } = useGithubStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    const { username, repoName } = formData;
    if (!username || !repoName) {
      alert("All Fields are required");
      return;
    }
    setIsLoading(true);
    clearData();
    loadRepoData(username.trim(), repoName.trim());
    setTimeout(() => setIsLoading(false), 2000);
  }
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
      {/* <div className="absolute inset-0 bg-black/50 bg-opacity-10"></div> */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-white/10 backdrop-blur-sm rounded-full">
            <GithubIcon className="w-8 h-8" />
          </div>

          <h1 className="text-4xl sm:text-5xl p-2 font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            GitHub Repository Analyzer
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Discover insights, visualize data, and explore your repositories
            like never before
          </p>

          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white border-opacity-20"
            >
              <div className="flex-1 relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white text-opacity-60" />
                <input
                  type="text"
                  name="username"
                  placeholder="GitHub Username"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white border-opacity-20 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 focus:border-transparent transition-all duration-300"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1 relative">
                <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white text-opacity-60" />
                <input
                  type="text"
                  name="repoName"
                  placeholder="Repository Name"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white border-opacity-20 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 focus:border-transparent transition-all duration-300"
                  value={formData.repoName}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
