import "core-js/modules/es.object.to-string.js";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [{
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: function component() {
      return import("./components/TutorialsList");
    }
  }, {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: function component() {
      return import("./components/Tutorial");
    }
  }, {
    path: "/add",
    name: "add",
    component: function component() {
      return import("./components/AddTutorial");
    }
  }]
});