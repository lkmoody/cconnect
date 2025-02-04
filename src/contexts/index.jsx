import {ThemeProvider} from "@mui/material";
import {theme} from "../themes/main.js";
import {CognitoAuthProvider} from "./cognito-auth-context.jsx";
import {UserViewProvider} from "./user-view-context.jsx";
import {CurrentUserProvider} from "./current-user-context.jsx";

const ContextProvider = ({children}) => {
    console.log(theme)
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

const DashboardContextProvider = ({children, onRedirectCallback}) => {
    return (
        <CognitoAuthProvider>
            <UserViewProvider>
                <CurrentUserProvider>
                    {children}
                </CurrentUserProvider>
            </UserViewProvider>
        </CognitoAuthProvider>
    )
}

export {DashboardContextProvider}

export default ContextProvider