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
  Button,
  link,
  popconfirm
} from 'element-ui'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css'
import router from './router.js'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(link)
Vue.use(popconfirm)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$ELEMENT = { size: 'small' }

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')
