import { createContext } from "react";

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
}

// Create context with a default value
export const AppContext = createContext<AppContextType>({
  searchFilter: { title: "", location: "" },
  setSearchFilter: () => {},
  isSearched: false,
  setIsSearched: () => {},
});
