import { createApp } from 'vue'
// elementplus全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import { globalRegister } from './global'
import './service/axios_demo'

import router from './router'
import store from './store'
import request from './service'

const app = createApp(App)
// globalRegister(app)
app.use(globalRegister)
app.use(store)
app.use(router)
// app.use(ElementPlus)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)

request.request({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config')
      return config
    },
    responseInterceptor: (res) => {
      console.log('单独响应的config')
      return res
    }
  }
})
