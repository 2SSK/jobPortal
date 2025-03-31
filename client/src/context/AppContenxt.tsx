import { createContext } from "react";

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
}

// Create context with a default value
export const AppContext = createContext<AppContextType>({
  searchFilter: { title: "", location: "" },
  setSearchFilter: () => {},
  isSearched: false,
  setIsSearched: () => {},
  jobs: [],
  setJobs: () => {},
});
