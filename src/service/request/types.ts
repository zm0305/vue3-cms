import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface MyRequestInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface MyRequestConfig extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptor
}
