import { createContext, useContext } from "react";

export const DepContext = createContext({});

export const DepProvider = ({ children, service, serviceImage }) => (
   <DepContext.Provider value={{ ...service, ...serviceImage }}>
      {children}
   </DepContext.Provider>
);

export const UseDep = _ => useContext(DepContext);