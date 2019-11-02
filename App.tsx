import React, { useEffect } from "react";
import { UserProvider } from "./src/authentication/userContext";

import firebaseConfig from "./src/config/firebase";
import { apps, initializeApp } from "firebase";

import Main from "./src/screens/Main";

const App = () => {
  useEffect(() => {
    if (apps.length <= 0) {
      initializeApp(firebaseConfig);
    }
  }, []);

  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
};

export default App;
