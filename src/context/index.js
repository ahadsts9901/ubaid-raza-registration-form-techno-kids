'use client'
// // In your context file
// import {  createContext, useContext, useState } from 'react';

import { createContext, useContext, useState } from "react";

// const GlobalContext = createContext();

// const GlobalContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <GlobalContext.Provider value={{ user, setUser }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export { GlobalContext, GlobalContextProvider };




const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState('abc');
  const [api, setApi] = useState(false);
  const [coursesToLoad, setCoursesToLoad] = useState(false);
  const [contactLoad, setContactLoad] = useState(false);
  const [allowAdmission,setAllowAdmission] = useState("");
  const [sideNavbarCity,setSideNavbarCity] = useState("");

  return (
    <PasswordContext.Provider value={{ password, setPassword ,api,setApi, allowAdmission,setAllowAdmission,coursesToLoad, setCoursesToLoad, sideNavbarCity,setSideNavbarCity, contactLoad, setContactLoad}}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => useContext(PasswordContext);