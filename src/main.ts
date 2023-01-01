import { createApp } from 'vue'
import Antd, { ConfigProvider } from 'ant-design-vue'

import App from './App.vue'
import Router from './router'
import icons from './config/icons'

import './style.css'

// import 'ant-design-vue/dist/antd.less'
import 'ant-design-vue/dist/antd.dark.less'

// import 'ant-design-vue/dist/antd.variable.min.css'

const app = createApp(App)
app.use(Router).use(Antd).mount('#mu-svg-editor')
icons(app)

// const color = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'];
// ConfigProvider.config({
//     theme: {
//         primaryColor: color[parseInt((Math.random() * 3).toString())],
//     },
// }); 