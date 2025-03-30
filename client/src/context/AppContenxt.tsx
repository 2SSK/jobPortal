import { createContext } from "react";

interface AppContextType {
  user: string | null;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const defaultValue: AppContextType = {
  user: null,
};

export const AppContext = createContext<AppContextType>(defaultValue);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const value: AppContextType = { user: null };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
