import {createContext, useCallback, useContext, useEffect, useReducer} from "react"
import {CognitoUser, CognitoUserPool, AuthenticationDetails} from "amazon-cognito-identity-js"
import {PATH_AUTH} from "../routes/paths.js"
import {cognitoConfig} from "../configurations/cognito-config.js"
import useLocalStorage from "use-local-storage";

export const UserPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.userPoolId,
    ClientId: cognitoConfig.clientId
})

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    token: null
}

const handlers = {
    AUTHENTICATE: (state, action) => {
        const {isAuthenticated, user, token} = action.payload

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
            token
        }
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
    })
}

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state)

const CognitoAuthContext = createContext({
    ...initialState,
    method: 'cognito',
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => Promise.resolve()
})

export const CognitoAuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [storedSession, setStoredSession] = useLocalStorage('session', {})

    const getUserAttributes = useCallback(
        (currentUser) =>
            new Promise((resolve, reject) => {
                currentUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        reject(err)
                    } else {
                        const results = {}

                        attributes.forEach((attribute) => {
                            results[attribute.Name] = attribute.Value
                        })
                        resolve(results)
                    }
                })
            }),
        []
    )

    const getSession = useCallback(
        async () =>
            new Promise((resolve, reject) => {
                if(Date.now() - storedSession?.time >= 3300) {
                    resolve(storedSession)
                }
                const user = UserPool.getCurrentUser()
                if (user) {
                    user.getSession(async (err, session) => {
                        if (err) {
                            reject(err)
                        } else {
                            dispatch({
                                type: 'AUTHENTICATE',
                                payload: {isAuthenticated: true, user}
                            })
                            resolve({...session, time: Date.now()})
                        }
                    })
                } else {
                    dispatch({
                        type: 'AUTHENTICATE',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                            token: null
                        }
                    })
                }
            }),
        [getUserAttributes]
    )

    const initial = useCallback(async () => {
        try {
            await getSession()
        } catch {
            dispatch({
                type: 'AUTHENTICATE',
                payload: {
                    isAuthenticated: false,
                    user: null,
                    token: null
                }
            })
        }
    }, [getSession])

    useEffect(() => {
        initial()
    }, [initial])

    // We make sure to handle the user update here, but return the resolve value in order for our components to be
    // able to chain additional `.then()` logic. Additionally, we `.catch` the error and "enhance it" by providing
    // a message that our React components can use.
    const login = useCallback(
        async (email, password, newPassword = null) =>
            new Promise((resolve, reject) => {
                const user = new CognitoUser({
                    Username: email,
                    Pool: UserPool
                })

                const authDetails = new AuthenticationDetails({
                    Username: email,
                    Password: password
                })

                user.authenticateUser(authDetails, {
                    onSuccess: async (data) => {
                        const session = await getSession()

                        setStoredSession(session)
                        resolve(data)
                    },
                    onFailure: (err) => {
                        reject(err)
                    },
                    newPasswordRequired: (userAttributes, requiredAttributes) => {
                        if(newPassword) {
                            user.completeNewPasswordChallenge(newPassword, requiredAttributes, {
                                onSuccess: async (data) => {
                                    const session = await getSession()
                                    setStoredSession(session)
                                    resolve(data)
                                },
                                onFailure: (error) => {console.log(error)}
                            })
                        }
                        // Handle this on login page for update password.
                        resolve({message: 'newPasswordRequired'})
                    }
                })
            }),
        [getSession]
    )

    // same thing here
    const logout = () => {
        const user = UserPool.getCurrentUser()
        if (user) {
            user.signOut()
            setStoredSession({})
            dispatch({type: 'LOGOUT'})
        }
    }

    const register = (email, password, firstName, lastName) =>
        new Promise((resolve, reject) =>
            UserPool.signUp(
                email,
                password,
                [
                    {Name: 'email', Value: email},
                    {Name: 'name', Value: `${firstName} ${lastName}`}
                ],
                null,
                async (err) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve()
                    window.location.href = PATH_AUTH.login
                }
            )
        )

    const resetPassword = (email, oldPassword, newPassword) => {
        return login(email, oldPassword, newPassword)
    }

    const getIdToken = useCallback(() => {
        new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser()
        })
    },[])

    return (
        <CognitoAuthContext.Provider
            value={{
                ...state,
                method: 'cognito',
                user: state.user,
                login,
                register,
                logout,
                resetPassword,
                getSession
            }}
        >
            {children}
        </CognitoAuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(CognitoAuthContext)
}


