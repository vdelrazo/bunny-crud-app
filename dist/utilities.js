import UsersDataService from "./services/UsersDataService";
import TasksDataService from "./services/TasksDataService";
export default {
  methods: {
    retrieveUsers: function retrieveUsers() {
      var _this = this;

      return UsersDataService.getAllUsers().then(function (response) {
        _this.users = response.data.map(_this.getDisplayUserName);
        console.log(response.data);
      }).catch(function (e) {
        console.log(e);
      });
    },
    retrieveTasks: function retrieveTasks() {
      var _this2 = this;

      return TasksDataService.getAllTasks().then(function (response) {
        _this2.tasks = response.data.docs.map(_this2.getDisplayTasks);
        console.log(response.data);
      }).catch(function (e) {
        console.log(e);
      });
    }
  }
};