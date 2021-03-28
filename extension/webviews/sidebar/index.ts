import Vue from '../vue';
import Sidebar from "./App.vue";
import store from "./store/index.js";

// INJECTED VARIABLES
Vue.prototype.$vscode = _vscode; 
Vue.prototype.$apiBaseUrl = apiBaseUrl;

new Vue({
  el: '#sidebar',
  store,
  render: (h: any) => h(Sidebar),
});
