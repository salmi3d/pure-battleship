import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

const { PORT = 3000, NODE_ENV } = process.env
const connection = NODE_ENV === 'production' ? location.host : `${location.hostname}:${PORT}`

Vue.use(VueCompositionAPI)
Vue.use(new VueSocketIO({ connection }))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
