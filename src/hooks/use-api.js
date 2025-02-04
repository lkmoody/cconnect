import axios from "axios"
import { useCallback } from "react"
import {useAuth} from "../contexts/cognito-auth-context.jsx";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + '/api/v1'
})

const GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete'
//PUT = 'put'

export const useApi = () => {
    const { getIdToken } = useAuth()
    const makeCall = useCallback(
        async (config) => {
            try {
                const token = await getIdToken()
                const requestConfig = { ...config, headers: { Authorization: `Bearer ${token}` } }
                const { data } = await instance.request(requestConfig)
                return data
            } finally {
            }
        }, [])

    // const makeNoAuthCall = useCallback(async (config) => {
    //     setIsLoading(true)
    //     try {
    //         const { data } = await instance.request(config)
    //         return data
    //     } finally {
    //         setIsLoading(false)
    //     }
    // },
    //     [setIsLoading]
    // )

    function doGet(url, params = {}) {
        return makeCall({ method: GET, url, params })
    }

    function doPost(url, data) {
        return makeCall({ method: POST, url, data })
    }

    function doDelete(url, params = {}) {
        return makeCall({method: DELETE, url, params})
    }

    function doPatch(url, data) {
        return makeCall({method: PATCH, url, data})
    }

    return {
        api: {
            getTest: () => doGet('/test'),
        }
    }
}