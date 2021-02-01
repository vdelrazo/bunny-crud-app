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
    path: "/tasks",
    name: "tasks",
    component: function component() {
      return import("./components/TasksList");
    }
  }]
});