import Vue from '../vue';
import HelloWorld from "../components/HelloWorld.vue";
console.log("hello from the ts file");
console.log({ vue: Vue });
new Vue({
  el: '#vue-project-here',
  render: (h: any) => h(HelloWorld),
});