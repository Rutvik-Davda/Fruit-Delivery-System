import React, { useState } from "react";
import { UserContext } from "./context";

const UserProvider = ({ children }) => {
  const [cartValue, setCartValue] = useState(0);

  return (
    <UserContext.Provider value={{ cartValue, setCartValue }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

