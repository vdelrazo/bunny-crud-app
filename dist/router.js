import "core-js/modules/es.object.to-string.js";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [{
    path: "/",
    alias: "/users",
    name: "users",
    component: function component() {
      return import("./components/UsersList");
    }
  }, {
    path: "/user/:id",
    name: "user-details",
    component: function component() {
      return import("./components/User");
    }
  }, {
    path: "/addUser",
    name: "adduser",
    component: function component() {
      return import("./components/AddUser");
    }
  }]
});