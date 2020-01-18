import { createContext } from "react";

//We have a loggedIn status, and two methods for logging in and logging out. We store it in a constant so we can export.
export const AuthContext = createContext({ 
    isLoggedIn: false, 
    login: () => {}, 
    logout: () => {} 
});