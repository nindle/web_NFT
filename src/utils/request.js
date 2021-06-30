import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  // headers、auth
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;

    // you can also judge the status by HTTP Status Code
    if (res.code !== 200) {
      // to re-login
      store.dispatch('user/resetToken').then(() => {
        location.reload();
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    // do something with request error
    console.log('err' + error);
    return Promise.reject(error);
  }
);

export default service;
