import { PropsWithChildren, useState, useEffect } from "react";
import { AppContext, AppContextType, Job } from "./AppContenxt";
import { jobsData } from "../assets/assets";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  // Add jobs state
  const [jobs, setJobs] = useState<Job[]>([]);

  // Function to fetch jobs
  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const value: AppContextType = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
