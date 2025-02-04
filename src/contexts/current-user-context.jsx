import {createContext, useContext} from "react";

const CurrentUserContext = createContext(null);
export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({children}) => {
    return (
        <CurrentUserContext.Provider value={{}}>
            {children}
        </CurrentUserContext.Provider>
    )
}