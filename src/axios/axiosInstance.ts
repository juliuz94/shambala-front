import axios from 'axios'
import Router from 'next/router'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('sha_user_token')}`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const code = error && error.response ? error.response.status : 0;
    if (code === 401 || code === 403) {
      localStorage.removeItem('sha_user_token')
      localStorage.removeItem('sha_user')
      Router.push('/login')
    }
    return Promise.reject(error);
  }
)