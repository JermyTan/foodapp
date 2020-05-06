import { createContext } from "react";

const UserContext = createContext({
  uid: null,
  role: null,
});

export default UserContext;
