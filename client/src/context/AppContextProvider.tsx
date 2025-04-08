import { PropsWithChildren, useState, useEffect, useCallback } from "react";
import {
  AppContext,
  AppContextType,
  Company,
  Job,
  JobApplication,
  User,
} from "./AppContenxt";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [userApplications, setUserApplications] = useState<JobApplication[]>(
    []
  );

  // Function to fetch jobs
  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);

      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [backendUrl]);

  // Function to fetch company data
  const fetchCompanyData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [companyToken, backendUrl]);

  // Function to fetch user data
  const fetchUserData = useCallback(async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(`${backendUrl}/api/user/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [backendUrl, getToken]);

  // Function to fetch user's applied applications data
  const fetchUserApplications = useCallback(async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(`${backendUrl}/api/user/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [backendUrl, getToken]);

  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, [companyToken, fetchJobs]);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken, fetchCompanyData]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user, fetchUserData, fetchUserApplications]);

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
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
