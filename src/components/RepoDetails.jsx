import { Star } from "lucide-react";
import { useGithubStore } from "../store/githubStore";
import { GitFork } from "lucide-react";
import { User } from "lucide-react";
import { Github } from "lucide-react";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { ExternalLink } from "lucide-react";

function RepoDetails() {
  const repoInfo = useGithubStore((state) => state.repoInfo);
  if (!repoInfo) return null;

  const stats = [
    {
      icon: Star,
      label: "Stars",
      value: repoInfo.stargazers_count,
      color: "text-yellow-500",
    },
    {
      icon: GitFork,
      label: "Forks",
      value: repoInfo.forks_count,
      color: "text-blue-500",
    },
    {
      icon: User,
      label: "Owner",
      value: repoInfo.owner.login,
      color: "text-green-500",
    },
  ];

  return (
    <div className="mx-auto md:px-6 md:py-12 my-5 md:my-0">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {repoInfo.name}
                </h2>
              </div>
              <p className="text-gray-600 md:text-lg leading-relaxed mb-4">
                {repoInfo.description || "No description available."}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  📝 {repoInfo.language}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  Created {new Date(repoInfo.created_at).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Updated {new Date(repoInfo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8">
              <a
                href={repoInfo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                View Repository
              </a>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`p-3 rounded-xl bg-white shadow-md group-hover:shadow-lg transition-all duration-300 ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="md:text-2xl font-bold text-gray-900">
                    {typeof stat.value === "number"
                      ? stat.value.toLocaleString()
                      : stat.value}
                  </p> 
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepoDetails;
