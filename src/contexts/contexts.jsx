import {CognitoAuthProvider} from './cognito-auth-context.jsx'

export const Contexts = ({children}) => {
    return (
        <CognitoAuthProvider>
                {children}
        </CognitoAuthProvider>
    )
}