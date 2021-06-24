import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";
import axios from '../src/config/interceptors'
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
