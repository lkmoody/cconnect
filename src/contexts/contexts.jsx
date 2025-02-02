import {CognitoAuthProvider} from './cognito-auth-context.jsx'
import {UserProvider} from './user-context.jsx'

export const Contexts = ({children}) => {
    return (
        <CognitoAuthProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </CognitoAuthProvider>
    )
}