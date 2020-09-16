import axios from 'axios'
import { getToken } from './token'
import { API_URL } from '../constants'

const instance = axios.create({
  timeout: 1000 * 20,
  baseURL: API_URL
})

instance.interceptors.request.use(config => {
  config.headers.token = getToken()

  return config
})

instance.interceptors.response.use(res => {
  const data = res.data
  if (!res.code) {
    return data.data
  } else {
    console.error('数据出错了')
  }
})

export default instance
