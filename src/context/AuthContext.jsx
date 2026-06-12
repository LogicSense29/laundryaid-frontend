import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("la_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("la_token"));
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("la_admin_user");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem("la_admin_token"));

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("la_user", JSON.stringify(userData));
    localStorage.setItem("la_token", accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("la_user");
    localStorage.removeItem("la_token");
  };

  const loginAdmin = (adminData, accessToken) => {
    setAdmin(adminData);
    setAdminToken(accessToken);
    localStorage.setItem("la_admin_user", JSON.stringify(adminData));
    localStorage.setItem("la_admin_token", accessToken);
  };

  const logoutAdmin = () => {
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem("la_admin_user");
    localStorage.removeItem("la_admin_token");
  };

  const authFetch = async (url, options = {}) => {
    const currentToken = token || localStorage.getItem("la_token");
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
        ...(options.headers || {}),
      },
    });
  };

  const adminAuthFetch = async (url, options = {}) => {
    const currentToken = adminToken || localStorage.getItem("la_admin_token");
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
        ...(options.headers || {}),
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, authFetch, admin, adminToken, loginAdmin, logoutAdmin, adminAuthFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
