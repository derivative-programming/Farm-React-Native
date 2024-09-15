import React, { createContext, useEffect, useState, ReactNode } from "react";
import { apiInstance } from "../apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  roles: string[];
  setRoles: (rolesCSV: string) => void;
  email: string | null;
  setEmail: (email: string) => void;
  clearSession: () => void;
  startSession: (sessionData: any) => void;
  customerName: string | null;
  organizationName: string | null;
  customerCode: string | null;
  orgCustomerCode: string | null;
  organizationCode: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  roles: [],
  setRoles: () => {},
  email: null,
  setEmail: () => {},
  clearSession: () => {},
  startSession: () => {},
  customerName: null,
  organizationName: null,
  customerCode: null,
  orgCustomerCode: null,
  organizationCode: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [customerCode, setCustomerCode] = useState<string | null>(null);
  const [orgCustomerCode, setOrgCustomerCode] = useState<string | null>(null);
  const [organizationCode, setOrganizationCode] = useState<string | null>(null);

  useEffect(() => {
    const loadSessionData = async () => {
      const storedToken = await AsyncStorage.getItem("@token");
      const storedEmail = await AsyncStorage.getItem("email");
      const storedRoles = await AsyncStorage.getItem("roleNameCSVList");
      const storedCustomerName = await AsyncStorage.getItem("customerName");
      const storedOrganizationName = await AsyncStorage.getItem("organizationName");
      const storedCustomerCode = await AsyncStorage.getItem("customerCode");
      const storedOrgCustomerCode = await AsyncStorage.getItem("orgCustomerCode");
      const storedOrganizationCode = await AsyncStorage.getItem("organizationCode");

      if (storedToken) setToken(storedToken);
      if (storedEmail) setEmail(storedEmail);
      if (storedRoles) setRoles(storedRoles.split(","));
      if (storedCustomerName) setCustomerName(storedCustomerName);
      if (storedOrganizationName) setOrganizationName(storedOrganizationName);
      if (storedCustomerCode) setCustomerCode(storedCustomerCode);
      if (storedOrgCustomerCode) setOrgCustomerCode(storedOrgCustomerCode);
      if (storedOrganizationCode) setOrganizationCode(storedOrganizationCode);
    };

    loadSessionData();
  }, []);

  useEffect(() => {
    if (token) {
      apiInstance.defaults.headers.common["Api-Key"] = token;
    }
  }, [token]);

  const onToken = async (token: string) => {
    setToken(token);
    await AsyncStorage.setItem("@token", token);
  };

  const onRoles = async (rolesCSV: string) => {
    if (rolesCSV === "") {
      setRoles([]);
      await AsyncStorage.removeItem("roleNameCSVList");
    } else {
      const roles = rolesCSV.split(',');
      setRoles(roles);
      await AsyncStorage.setItem("roleNameCSVList", rolesCSV);
    }
  };

  const onEmail = async (email: string) => {
    setEmail(email);
    await AsyncStorage.setItem("email", email);
  };

  const onCustomerName = async (customerName: string) => {
    setCustomerName(customerName);
    await AsyncStorage.setItem("customerName", customerName);
  };

  const onOrganizationName = async (organizationName: string) => {
    setOrganizationName(organizationName);
    await AsyncStorage.setItem("organizationName", organizationName);
  };

  const onCustomerCode = async (customerCode: string) => {
    setCustomerCode(customerCode);
    await AsyncStorage.setItem("customerCode", customerCode);
  };

  const onOrgCustomerCode = async (orgCustomerCode: string) => {
    setOrgCustomerCode(orgCustomerCode);
    await AsyncStorage.setItem("orgCustomerCode", orgCustomerCode);
  };

  const onOrganizationCode = async (organizationCode: string) => {
    setOrganizationCode(organizationCode);
    await AsyncStorage.setItem("organizationCode", organizationCode);
  };

  const onStartSession = (sessionData: any) => {
    if ('apiKey' in sessionData) onToken(sessionData.apiKey);
    if ('email' in sessionData) onEmail(sessionData.email);
    if ('roleNameCSVList' in sessionData) onRoles(sessionData.roleNameCSVList);
    if ('customerCode' in sessionData) onCustomerCode(sessionData.customerCode);
    if ('orgCustomerCode' in sessionData) onOrgCustomerCode(sessionData.orgCustomerCode);
    if ('organizationCode' in sessionData) onOrganizationCode(sessionData.organizationCode);
    if ('customerName' in sessionData) onCustomerName(sessionData.customerName);
    if ('companyName' in sessionData || 'organizationName' in sessionData) {
      onOrganizationName(sessionData.organizationName);
    }
  };

  const onClearSession = async () => {
    await AsyncStorage.multiRemove([
      "@token",
      "email",
      "roleNameCSVList",
      "customerName",
      "organizationName",
      "customerCode",
      "orgCustomerCode",
      "organizationCode"
    ]);

    setToken(null);
    setEmail(null);
    setRoles([]);
    setCustomerName(null);
    setOrganizationName(null);
    setCustomerCode(null);
    setOrgCustomerCode(null);
    setOrganizationCode(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: onToken,
        roles,
        setRoles: onRoles,
        email,
        setEmail: onEmail,
        clearSession: onClearSession,
        startSession: onStartSession,
        customerName,
        organizationName,
        customerCode,
        orgCustomerCode,
        organizationCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
