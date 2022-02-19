//axios实例
import axios from 'axios'

//1.axios的基本操作
// axios
//   .get('http://123.207.32.32:8000/home/multidata')
//   .then((res: AxiosResponse<any>) => {
//     console.log(res)
//   })

//2.axios的配置选项
axios.defaults.baseURL = 'http://httpbin.org/'
axios.defaults.timeout = 3000
// axios.get('get').then((res: AxiosResponse<any>) => {
//   console.log(res)
// })
//3.axios.all
// axios
//   .all([
//     axios.get('get'),
//     axios.post('post', { data: { name: 'aaa', age: '88' } })
//   ])
//   .then((res) => {
//     console.log(res)
//   })

//4.拦截器
axios.interceptors.request.use(
  (config) => {
    console.log('请求拦截成功')
    return config
  },
  (err) => {
    console.log('请求发送错误', err)
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log('响应拦截成功')
    return res
  },
  (err) => {
    console.log('响应失败', err)
  }
)
