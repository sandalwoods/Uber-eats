import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";

//Sub ID
// f51d548d-f74e-4ae4-8773-45fb8bc402ce
//userid: 31a00381-22f8-4f9d-8708-e7f54594fadb

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  useEffect(() => {
    DataStore.query(User, (user) => user.sub("eq", sub)).then((users) =>
      setDbUser(users[0])
    );
  }, [sub]);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
