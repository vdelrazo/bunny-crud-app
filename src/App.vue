<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        @vdelrazog
      </div>

      <v-btn to="/users" text>
        Users
      </v-btn>

      <v-btn to="/tasks" text>
        Tasks
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>
