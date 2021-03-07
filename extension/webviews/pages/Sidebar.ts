import Vue from '../vue';
import Sidebar from "../components/Sidebar.vue";
import store from "../store/index.js";

// import axios from 'axios';
// console.log({ axios });
// // const axios = require('axios').default;
// Vue.prototype.$fetch = axios;

Vue.prototype.$vscode = _vscode;
Vue.prototype.$apiBaseUrl = apiBaseUrl;

new Vue({
  el: '#sidebar',
  store,
  render: (h: any) => h(Sidebar),
});
