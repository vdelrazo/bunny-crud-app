<template>
<v-col align="center" class="mx-auto pa-10">
  <v-expansion-panels>
    <v-toolbar-title>TASKS LIST</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-btn color="primary" dark class="mb-2" @click="refresh"> Refresh </v-btn>
    <v-expansion-panel v-for="(user, userIndex) in this.users" :key="userIndex">
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4"> {{ user.name }} </v-col>
          <v-col cols="8" align="left" class="text--secondary">
            <v-fade-transition leave-absolute>
              <span v-if="open">To do list task</span>
              <v-row v-else no-gutters style="width: 100%">
                  Tasks: {{ user.matchingTasks.length }}
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card>
          <v-card-text>
            <v-container class="pa-0">
              <v-dialog v-model="dialog" max-width="1000px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="8" sm="6" md="10">
                          <v-text-field
                            v-model="editedItem.description"
                            label="Task description"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4" sm="6" md="2">
                          <v-switch
                            v-model="editedItem.state"
                            label="Task completed"
                          ></v-switch>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveTask">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-row v-if="user.matchingTasks.length === 0">
                <v-col cols="12" align="center">
                  <v-btn color="primary" @click="createTask(user)">
                    Add new task
                  </v-btn>
                </v-col>
              </v-row>
              <v-row
                v-for="(task, taskIndex) in user.matchingTasks"
                :key="taskIndex"
                align="center"
                no-gutters
              >
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Are you sure you want to delete this task?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteTaskConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-col class="pa-2" cols="7" align="left">
                  {{ task.description }}
                </v-col>
                <v-col class="pr-1" cols="2"> Done: {{ task.state }} </v-col>
                <v-col class="pr-1" cols="1">
                  <v-icon small @click="editTask(task)">mdi-pencil</v-icon>
                </v-col>
                <v-col class="pr-1" cols="1">
                  <v-icon small @click="deleteTask(task)"> mdi-delete </v-icon>
                </v-col>
                <v-col class="pr-1" cols="1">
                  <v-icon small @click="createTask(task)"> mdi-plus </v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-col>
</template>

<script>
import UsersDataService from "../services/UsersDataService";
import TasksDataService from "../services/TasksDataService";

export default {
  name: "tasks-list",
  data() {
    return {
      users: [],
      tasks: [],
      title: "",
      headers: [
        { text: "User name", align: "start", sortable: true, value: "name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      taskHeaders: [
        {
          text: "Description",
          align: "start",
          sortable: true,
          value: "description",
        },
        { text: "Completed", value: "state", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: "",
      },
      selected: [],
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Task" : "Edit Task";
    },
  },

  methods: {
    createTask(item) {
      this.editedIndex = -1;
      if (item.id && !item.name) {
        this.editedItem = Object.assign({
          user_id: item.user_id,
          state: false,
        });
      } else {
        this.editedItem = Object.assign({ user_id: item.id, state: false });
      }
      this.dialog = true;
    },

    editTask(item) {
      this.editedIndex = item.id ? 1 : -1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      // this.$router.push({ name:"tutorial-details", params: { id: id } });
    },

    matchingUsers() {
      this.users.forEach((u) => {
        u.matchingTasks = [];
        this.tasks.forEach((t) => {
          if (t.user_id === u.id) {
            return u.matchingTasks.push(t);
          }
        });
      });
      return false;
    },

    refresh() {
      this.matchingUsers();
    },

    saveTask() {
      if (this.editedIndex > 0) {
        TasksDataService.updateTask(
          this.editedItem.id,
          this.editedItem.description,
          this.editedItem.state
        )
          .then((response) => {
            console.log(response.statusText);
          })
          .catch((e) => {
            console.log(e);
          });
            const tUpdate = this.tasks.find((t) => t.id === this.editedItem.id);
            tUpdate.description = this.editedItem.description;
            tUpdate.state = this.editedItem.state;
      } else {
        const self = this;
        TasksDataService.createTask(
          this.editedItem.user_id,
          this.editedItem.description,
          this.editedItem.state
        )
          .then((response) => {
            console.log(response.data);
            self.tasks.push({
              id: response.data._id,
              description: response.data.description,
              state: response.data.state,
              user_id: response.data.user_id,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
      this.close();
      this.matchingUsers();
    },

    deleteTaskConfirm() {
      TasksDataService.deleteTask(this.editedItem.id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.tasks = this.tasks.filter((t) => t.id !== this.editedItem.id && t.description !== this.editedItem.description);
      this.closeDelete();
    },

    deleteTask(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    getDisplayUserName(users) {
      return {
        id: users._id,
        name: users.name,
        matchingTasks: [],
      };
    },

    getDisplayTasks(tasks) {
      return {
        id: tasks._id,
        description: tasks.description,
        state: tasks.state,
        user_id: tasks.user_id,
      };
    },

    retrieveUsers() {
      UsersDataService.getAllUsers()
        .then((response) => {
          this.users = response.data.map(this.getDisplayUserName);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveTasks() {
      TasksDataService.getAllTasks()
        .then((response) => {
          this.tasks = response.data.docs.map(this.getDisplayTasks);
          console.log(response.data);
          this.matchingUsers();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.matchingUsers();
    },
  },

  mounted() {
    this.retrieveUsers();
    this.retrieveTasks();
  },
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>
