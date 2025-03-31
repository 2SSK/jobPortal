import { PropsWithChildren, useState } from "react";
import { AppContext, AppContextType } from "./AppContenxt";

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const value: AppContextType = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
