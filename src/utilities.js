import UsersDataService from "./services/UsersDataService";
import TasksDataService from "./services/TasksDataService";

export default {
  methods: {
    retrieveUsers() {
      return UsersDataService.getAllUsers()
        .then((response) => {
          this.users = response.data.map(this.getDisplayUserName);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveTasks() {
      return TasksDataService.getAllTasks()
        .then((response) => {
          this.tasks = response.data.docs.map(this.getDisplayTasks);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
