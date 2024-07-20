//Manages the global authentication state 
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [apiKey, setApiKey] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, apiKey, setApiKey }}>
      {children}
    </AuthContext.Provider>
  );
}
