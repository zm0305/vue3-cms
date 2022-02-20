import axios, { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import { MyRequestInterceptor, MyRequestConfig } from './types'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptor
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据'
          })
        }
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
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败')
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404 not found')
        }
        return err
      }
    )
  }

  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            config = config.interceptors.responseInterceptor(res)
          }
          //将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
