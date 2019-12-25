import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {routes} from './services/routes'
import StoreData from './store/store'
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;


Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData);
export const router = new VueRouter({
  routes,
  mode: 'history'
});



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

