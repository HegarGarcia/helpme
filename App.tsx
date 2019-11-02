import React from "react";
import { UserProvider } from "./src/authentication/userContext";
import Main from "./src/screens/Main";

const App = () => {
  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
};

export default App;
