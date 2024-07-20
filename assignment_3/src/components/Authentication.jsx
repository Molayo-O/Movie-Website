//Manages the global authentication state 
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function Authentication({ children }) {
  const [isAuth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
