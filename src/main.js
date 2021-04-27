import Vue from 'vue'
import {
  Table,
  TableColumn,
  Input,
  Pagination,
  Message,
  Loading,
  Select,
  Option,
  Button
} from 'element-ui'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
