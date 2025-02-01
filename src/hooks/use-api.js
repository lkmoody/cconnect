import axios from "axios";
import {useCallback} from "react";

const instance = axios.create({
    baseURL: import.meta.env.BASE_URL + '/api/v1'
})

const GET = 'get'

export const useApi = () => {
    const makeCall = useCallback(
        async (config) => {
            try {
                const idToken = (await Auth.currentSession()).getIdToken().getJwtToken()
                const requestConfig = { ...config, headers: { Authorization: `Bearer ${idToken}` } }
                const { data } = await instance.request(requestConfig)
                return data
            } finally {
            }
        }, [])
}