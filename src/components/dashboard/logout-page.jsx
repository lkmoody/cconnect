import {useAuth} from "../../contexts/cognito-auth-context.jsx";

export const LogoutPage = () => {
    const { logout } = useAuth()
    logout()
    return (<Navigator to={'/'} />)
}