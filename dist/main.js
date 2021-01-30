import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
Vue.config.productionTip = false;
new Vue({
  router: router,
  vuetify: vuetify,
  render: function render(h) {
    return h(App);
  }
}).$mount('#app');