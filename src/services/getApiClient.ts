import axios, { AxiosInstance } from 'axios'
import { parseCookies } from 'nookies'

export function getApiClient(ctx?: any): AxiosInstance {
  const api = axios.create({
    baseURL: 'http://192.168.0.108:3000',
  })

  const { 'vinci:access_token': access_token } = parseCookies(ctx)

  if (access_token) {
    api.defaults.headers.common.Authorization = `Bearer ${access_token}`
  }

  return api
}
