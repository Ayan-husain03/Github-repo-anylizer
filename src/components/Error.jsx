import React from "react";
import { AlertTriangle } from "lucide-react";

const Error = ({
  message = "Something went wrong. Please try again later.",
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100  p-4 rounded-full">
            <AlertTriangle className="text-red-500 dark:text-red-400 w-10 h-10" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800  mb-2">
          Oops!
        </h1>
        <p className="text-gray-600  mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
