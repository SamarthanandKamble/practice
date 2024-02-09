import { createContext, useEffect, useState } from "react";
export const NameContext = createContext(null);

export const NameProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {}, []);

  return (
    <NameContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </NameContext.Provider>
  );
};
