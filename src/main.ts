import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import Router from './router'
import icons from './config/icons'
import './style.css'
// import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/antd.dark.css'

const app = createApp(App)
app.use(Router).use(Antd)
app.mount('#mu-svg-editor')
icons(app)
