import React from "react";
import { useGithubStore } from "../store/githubStore";
import { ExternalLink } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Settings } from "lucide-react";

function IssueList() {
  const issues = useGithubStore((state) => state.issues);
  if (!issues || issues.length === 0) {
    return (
      <div className="w-full mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl h-full flex flex-col items-center justify-center p-8 text-center">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-black text-lg">No Issues found</p>
        </div>
      </div>
    );
  }
  const topIssues = issues.slice(0, 5);
  return (
    <div className="mx-auto md:px-6 my-5 md:py-8">
      <div className="bg-white md:rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Open Issues</h3>
              <p className="text-gray-600">Recent repository issues</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-4">
            {topIssues.map((issue, index) => (
              <div
                key={issue.id}
                className="group p-6 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:scale-102"
              >
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {issue.title}
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">#{issue.id}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueList;
