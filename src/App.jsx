import React from "react";
import { useEffect } from "react";
import Dashboard from "./page/Dashboard";
import { useGithubStore } from "./store/githubStore";

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
export default App;
