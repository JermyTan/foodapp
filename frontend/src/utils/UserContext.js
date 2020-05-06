import { createContext } from "react";

const UserContext = createContext({
  uid: null,
  role: null,
  name: null,
  email: null,
});

export default UserContext;
