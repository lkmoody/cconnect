import {createContext, useContext} from "react"

const UserViewContext = createContext(null)
export const useView = () => useContext(UserViewContext)

export const UserViewProvider = ({ children }) => {
    return (
        <UserViewContext.Provider value={{

        }}>
            {children}
        </UserViewContext.Provider>
    )
}