import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//挂载Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

//引入BIN-DATAV
import { BorderBox, ScrollTable } from 'bin-datav'
import 'bin-datav/lib/styles/index.css'

const app = createApp(App)

app.use(ElementPlus);
app.use(createPinia())
app.use(router)
app.use(BorderBox)
app.use(ScrollTable)


app.mount('#app')
