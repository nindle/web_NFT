import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import { ethers } from "ethers";
Vue.prototype.$ethers = ethers;

import Cookies from "js-cookie";
Vue.prototype.$cookie = Cookies;

import "./styles/index.less"; // global css
import i18n from "./lang"; // internationalization
import "./icons"; // iconfont

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale(store.getters.language);
Vue.prototype.$dayjs = dayjs;

Vue.use(ElementUI);

Vue.filter("faddr", function(val) {
  // 0xEC9a4546382533C74FB5f37A6F447C4cFFC35cBf
  // 0xEC9a454638...7C4cFFC35cBf
  return val.substr(0, 12) + "..." + val.substr(30, 12);
});

Vue.filter("fwei", function(res) {
  return ethers.utils.parseEther(res).toString();
});

Vue.filter("feth", function(res) {
  let amount = ethers.utils.formatEther(res);
  return Math.round(amount * 1e4) / 1e4;
});

Vue.prototype.$formatEther = function(res) {
  let amount = ethers.utils.formatEther(res);
  return Math.round(amount * 1e4) / 1e4;
};

Vue.prototype.$parseEther = function(res) {
  return ethers.utils.parseEther(res);
};

Vue.prototype.$Cover = function(res) {
  if (!res) {
    return '';
  }
  let baseUrl = process.env.NODE_ENV === "production" ? "https://api.lionnft.io" : "https://api.lionnft.net";
  return res.replace(
    'ipfs://ipfs/',
    baseUrl+'/v1/upload/view?hash='
  );
};

Vue.prototype.$baseUrl = process.env.NODE_ENV === "production" ? "https://api.lionnft.io" : "https://api.lionnft.net";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
