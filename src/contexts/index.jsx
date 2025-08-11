import {ThemeProvider} from "@mui/material";
import {theme} from "../themes/main.js";
import {CognitoAuthProvider} from "./cognito-auth-context.jsx";
import {UserViewProvider} from "./user-view-context.jsx";
import {CurrentUserProvider} from "./current-user-context.jsx";

const ContextProvider = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

const DashboardContextProvider = ({children, onRedirectCallback}) => {
    return (
        <CognitoAuthProvider>
            <CurrentUserProvider>
                <UserViewProvider>
                    {children}
                </UserViewProvider>
            </CurrentUserProvider>
        </CognitoAuthProvider>
    )
}

export {DashboardContextProvider}

export default ContextProvider