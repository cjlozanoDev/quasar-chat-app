<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title
          >{{ isAuthenticated ? user.email : "chat " }}
        </q-toolbar-title>

        <div>
          <q-btn color="negative" v-if="isAuthenticated"> Salir </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuth } from "@vueuse/firebase";
import { auth } from "boot/firebase";

export default {
  name: "MainLayout",
  setup() {
    const { isAuthenticated, user } = useAuth(auth.auth);
    return {
      isAuthenticated,
      user,
    };
  },
};
</script>
