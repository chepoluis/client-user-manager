import { createContext, useContext, useState, useEffect } from "react";
import { useCheckAuth } from "../hooks/useCheckout";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const status = useCheckAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [status]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, status }}>
      {children}
    </AuthContext.Provider>
  );
};
