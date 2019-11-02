import React, { createContext, useState, FC } from "react";

interface Context {
  user: firebase.User;
  setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
}

export const UserContext = createContext<Context>({
  user: null,
  setUser: null
});

export const UserProvider: FC<{}> = props => {
  const [user, setUser] = useState<firebase.User>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
