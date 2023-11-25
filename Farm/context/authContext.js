import React, { createContext, useEffect, useState } from "react";
import { apiInstance } from "../apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    apiInstance.defaults.headers.common["Api-Key"] = token;
  }, [token]);

  const onToken = (token) => { 
    setToken(token);
  };

  
  useEffect(() => {
     console.log("roles...");
     console.log(roles);
  }, [roles]);

  useEffect(() => { 
    const loadToken = async () => {
        const storedToken = await AsyncStorage.getItem("@token");
        setToken(storedToken);
    };
 
    loadToken();
}, []); // Empty dependency array to run only once on mount

  const onRoles = (rolesCSV) => { 
    const roles  = rolesCSV.split(','); 
    setRoles(roles);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: onToken,
        roles,
        setRoles: onRoles
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
