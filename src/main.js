import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 挂载 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入 BIN-DATAV
import { BorderBox, ScrollTable } from 'bin-datav'
import 'bin-datav/lib/styles/index.css'



const app = createApp(App)
const pinia =createPinia()


// 使用已导入的 pinia 实例，而不重新创建
app.use(ElementPlus)
app.use(pinia)  // 使用导入的 pinia 实例
app.use(router)
app.use(BorderBox)
app.use(ScrollTable)

app.mount('#app')
