import React, { createContext } from "react";

// Define User interfcae
export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  resume?: string;
}

// Define Company interface
export interface Company {
  _id: string;
  name: string;
  email: string;
  image: string;
}

// Define Job interface
export interface Job {
  _id: string;
  title: string;
  location: string;
  level: string;
  description: string;
  salary: number;
  date: number;
  category: string;
  companyId: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
}

// Define JobApplication interface
export interface JobApplication {
  _id: string;
  jobId: Job;
  userId: string;
  companyId: Company;
  date: number;
  status?: string;
}

// Define the interface for the context
export interface AppContextType {
  searchFilter: {
    title: string;
    location: string;
  };
  setSearchFilter: React.Dispatch<
    React.SetStateAction<{
      title: string;
      location: string;
    }>
  >;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  showRecruiterLogin: boolean;
  setShowRecruiterLogin: React.Dispatch<React.SetStateAction<boolean>>;
  companyToken: string | null;
  setCompanyToken: React.Dispatch<React.SetStateAction<string | null>>;
  companyData: Company | null;
  setCompanyData: React.Dispatch<React.SetStateAction<Company | null>>;
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  userApplications: JobApplication[];
  setUserApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
  backendUrl: string;
  fetchUserData: () => Promise<void>;
  fetchUserApplications: () => Promise<void>;
}

// Create context with a default value
export const AppContext = createContext<AppContextType>({
  searchFilter: { title: "", location: "" },
  setSearchFilter: () => {},
  isSearched: false,
  setIsSearched: () => {},
  jobs: [],
  setJobs: () => {},
  showRecruiterLogin: false,
  setShowRecruiterLogin: () => {},
  companyToken: null,
  setCompanyToken: () => {},
  companyData: null,
  setCompanyData: () => {},
  userData: null,
  setUserData: () => {},
  userApplications: [],
  setUserApplications: () => {},
  backendUrl: "",
  fetchUserData: async () => {},
  fetchUserApplications: async () => {},
});
