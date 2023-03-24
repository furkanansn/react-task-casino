import React, { useState, useEffect } from "react";


const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},  
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("User");

    if (storedUserLoggedInInformation) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("User");
    setIsLoggedIn(false);
  };



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
