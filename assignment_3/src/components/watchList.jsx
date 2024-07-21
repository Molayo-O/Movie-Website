import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Authentication";

export default function WatchList() {
  const { apiKey } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);
  return <div
  style={{ color: "white" }}>Your API Key is {apiKey}
  </div>;
}
