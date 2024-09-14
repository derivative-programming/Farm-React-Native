import React, { createContext, useEffect, useState } from "react";
import { apiInstance } from "../apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if(token){
      console.log("Set header Api-Key..." + token);
      apiInstance.defaults.headers.common["Api-Key"] = token;
    } else{
      console.log("Set header Api-Key...''");
      apiInstance.defaults.headers.common["Api-Key"] = "";
    }
  }, [token]);

  const onToken = (token) => { 
    console.log("AuthContext token updated..." + token);
    setToken(token);
  };

  
  useEffect(() => {
     console.log("AuthContext roles updated...");
     console.log(roles);
  }, [roles]);

  useEffect(() => { 
    console.log("AuthContext initial effect...");
    const loadToken = async () => {
        console.log("AuthContext initial effect - loadToken...");
        const storedToken = await AsyncStorage.getItem("@token");
        console.log("AuthContext initial effect - loadToken token found..." + storedToken);
        console.log("Set header Api-Key asap..." + storedToken);
        apiInstance.defaults.headers.common["Api-Key"] = storedToken;
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
