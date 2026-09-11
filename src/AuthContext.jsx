import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
