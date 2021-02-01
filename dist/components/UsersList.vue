<template>
  <v-col align="center" class="list px-12 mx-auto">
    <v-data-table
      :v-model="selected"
      :headers="headers"
      :items="users"
      disable-pagination
      :hide-default-footer="true"
      item-key="id"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>USERS LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="User name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveUser">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this user?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteUserConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteUser(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      tasks: [],
      title: "",
      headers: [
        { text: "User name", align: "start", sortable: true, value: "name" },
        { text: "Actions", align: "right", value: "actions", sortable: false },
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
      defaultItem: {
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
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },

  methods: {
    deleteUserConfirm() {
      UsersDataService.deleteUser(this.users[this.editedIndex].id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.closeDelete();
      this.users = this.users.filter((u) => u.id !== this.editedItem.id);
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
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    saveUser() {
      if (this.editedIndex > 0) {
        UsersDataService.updateUser(this.editedItem.id, this.editedItem.name)
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
          this.users = this.users.filter((u) => u.id !== this.editedItem.id);
      } else {
        UsersDataService.createUser(this.editedItem.name)
          .then((response) => {
            console.log(response.data);
            this.users.push({
              id: response.data._id,
              name: response.data.name,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
      this.close();
    },

    editUser(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteUser(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    getDisplayUserName(users) {
      return {
        id: users._id,
        name: users.name,
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

    tasksForUser({ item }) {
      // return this.$vm.tasks.filter(t => t.user_id === id)
      // TasksDataService.getTasksByUser(id)
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      console.log(item.id);
      console.log(this.tasks.filter((t) => t.user_id === item.id));
      return this.tasks.filter((t) => t.user_id === item.id);
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
  },

  mounted() {
    this.retrieveUsers();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
