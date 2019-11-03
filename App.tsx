import React from "react";
import { UserProvider } from "./src/authentication/userContext";
import MainScreen from "./src/screens/MainScreen";

const App = () => {
  return (
    <UserProvider>
      <MainScreen />
    </UserProvider>
  );
};

export default App;
