import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'components/ant-design-vue/AntDesignVue'
import 'components/v-color-picker/VColorPicker'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
