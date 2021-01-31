import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/users",
      name: "users",
      component: () => import("./components/UsersList")
    },
    {
      path: "/user/:id",
      name: "user-details",
      component: () => import("./components/User")
    },
    {
      path: "/addUser",
      name: "adduser",
      component: () => import("./components/AddUser")
    }
  ]
});
