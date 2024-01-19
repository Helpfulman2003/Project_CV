import axios from 'axios'
import {jwtDecode} from "jwt-decode";

const refreshToken = async(user) => {
    try {
        const route = user.role === 'seller' ? 'shop' : 'auth'
        const res = await axios.post(`http://localhost:3001/api/${route}/refresh-token`, {id: user._id})
        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
}


export const createAxios = (user: any, dispatch: any, stateUser: any) => {
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async(config) => {
            if(user.accessToken) {
                const date = new Date()
                const decodeToken = await jwtDecode(user.accessToken) 
                if(decodeToken?.exp && decodeToken.exp < date.getTime() / 1000) {
                    try {
                        const data = await refreshToken(user)
                        const refreshUser = {
                            ...user,
                            accessToken : data?.accessToken
                        }
                        dispatch(stateUser(refreshUser))
                        config.headers.token = "Bearer " + data?.accessToken;
                    } catch (error) {
                        console.log("Error refreshing token:", error);
                    }
                }
            }
            return config
        },
        (err) => {
            return Promise.reject(err);
        }
    )
    // Add a response interceptor to handle token refresh on receiving a 401 response
    newInstance.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const data = await refreshToken(user)
                const refreshUser = {
                    ...user,
                    accessToken : data?.accessToken
                }
                dispatch(stateUser(refreshUser))
                originalRequest.headers.token = "Bearer " + data?.accessToken;
                return newInstance(originalRequest);
            }
            return Promise.reject(error);
        }
    )
    return newInstance
}
