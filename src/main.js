import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Cookies from 'js-cookie';
Vue.prototype.$cookie = Cookies;

import './styles/index.less'; // global css
import i18n from './lang'; // internationalization
import './icons'; // iconfont

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale(store.getters.language);
Vue.prototype.$dayjs = dayjs;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
