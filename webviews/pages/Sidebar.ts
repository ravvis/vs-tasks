import Vue from '../vue';
import Sidebar from "../components/Sidebar.vue";
console.log("hello from the ts file");
console.log({ vue: Vue });

Vue.prototype.$vscode = _vscode;
console.log({ _vscode: _vscode });

new Vue({
  el: '#sidebar',
  render: (h: any) => h(Sidebar),
});