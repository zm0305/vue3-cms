import { App } from 'vue'
import { ElButton } from 'element-plus'
// 引入基础样式base.css
import 'element-plus/theme-chalk/base.css'

const components = [ElButton]

export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
