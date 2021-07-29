import axios from "axios";
// import Common from './common';

axios.defaults.withCredentials = true;

let baseUrl = process.env.NODE_ENV === "production" ? "https://api.lionnft.io" : "https://api.lionnft.net";

let loginUrl = baseUrl + "/v1/account/login";
export default {
  httpGet: function(url, data, succFn) {
    // data.page_size = localStorage.getItem("page_size");
    axios({
      url: baseUrl + url,
      method: "get",
      params: data,
      type: "json"
    }).then(resp => {
      if (resp.data.code == 401) {
        console.log("not login");
        // location.href = loginUrl + "?goto=" + escape(location.href);
        // Common.modalLogin("xxx");
        // return;
      }
      succFn(resp.data);
    });
  },

  httpPost: function(url, data, succFn) {
    // data.page_size = localStorage.getItem("page_size");
    axios({
      url: baseUrl + url,
      method: "post",
      data,
      type: "json"
    }).then(resp => {
      if (resp.data.code == 401) {
        // console.log("not login");
        // location.href = loginUrl + "?goto=" + escape(location.href);
        return;
      }
      succFn(resp.data);
    });
  },

  httpJson: function(url, data, succFn) {
    data.page_size = localStorage.getItem("page_size");
    axios({
      url: baseUrl + url,
      method: "post",
      data: JSON.stringify(data),
      type: "json",
      contentType: "application/json"
    }).then(resp => {
      if (resp.data.code == 401) {
        console.log("not login");
        // location.href = loginUrl + "?goto=" + escape(location.href);
        return;
      }
      succFn(resp.data);
    });
  }
};
