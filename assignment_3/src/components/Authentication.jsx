//Manages the global authentication state
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  //initialize state from cookies
  const [isAuth, setIsAuth] = useState(Cookies.get("isAuth") === "true");
  const [apiKey, setApiKey] = useState(Cookies.get("apiKey") || null);

  //update cookies when isAuth changes
  useEffect(() => {
    //if state is present update the cookie else remove
    if (isAuth) {
      Cookies.set('isAuth', 'true', { expires: 1 });
    } else {
      Cookies.remove('isAuth');
    }
  }, [isAuth]);

  // Update cookies when `apiKey` changes
  useEffect(() => {
    //if state is present update the cookie else remove
    if (apiKey) {
      Cookies.set('apiKey', apiKey, { expires: 1 });
    } else {
      Cookies.remove('apiKey');
    }
  }, [apiKey]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, apiKey, setApiKey }}>
      {children}
    </AuthContext.Provider>
  );
}
