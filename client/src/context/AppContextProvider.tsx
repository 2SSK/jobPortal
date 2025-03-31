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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
