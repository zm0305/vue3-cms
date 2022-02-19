import axios, { AxiosInstance } from 'axios'
import { MyRequestInterceptor, MyRequestConfig } from './types'

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptor

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    //从config中获取各自定义的拦截器，可选
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //为所有的实例都添加拦截器，执行顺序为先
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求成功')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应成功')
        return res.data
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败')
        return err
      }
    )
  }

  request(config: MyRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        config = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default MyRequest
