import axios from 'axios'
import { ServerUrl } from '../App'

const axiosInstance = axios.create({
    baseURL: ServerUrl
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axiosInstance