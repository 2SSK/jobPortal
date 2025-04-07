import { PropsWithChildren, useState, useEffect } from "react";
import { AppContext, AppContextType, Company, Job } from "./AppContenxt";
import { jobsData } from "../assets/assets";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  const [companyToken, setCompanyToken] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState<Company | null>(null);

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
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
