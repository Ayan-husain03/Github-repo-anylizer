import React from "react";
import SearchForm from "../components/SearchForm";
import CommitActivity from "../components/CommitActivity";
import Languages from "../components/LanguagesPieChart";
import ContributorChart from "../components/ContributorChart";
import IssueList from "../components/IssueList";
import RepoDetails from "../components/RepoDetails";
import { useGithubStore } from "../store/githubStore";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Footer from "../components/Footer";

function Dashboard() {
  const isLoading = useGithubStore((state) => state.isLoading);
  const error = useGithubStore((state) => state.error);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <SearchForm />
      {isLoading ? (
        <div className="w-full h-96 flex justify-center items-center bg-zinc-200">
          <Loader />
        </div>
      ) : null}
      {error ? <Error message={error} /> : null}
      <RepoDetails />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 my-5 mx-auto ">
        <CommitActivity />
        <Languages />
      </div>
      <ContributorChart />
      <IssueList />
      <Footer />
    </div>
  );
}

export default Dashboard;
