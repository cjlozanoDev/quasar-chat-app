<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title
          >{{ isAuthenticated ? user.email : "chat " }}
        </q-toolbar-title>

        <div>
          <q-btn color="negative" v-if="isAuthenticated" @click="salir">
            Salir
          </q-btn>
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
import { auth, db } from "boot/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default {
  name: "MainLayout",
  setup() {
    const { isAuthenticated, user } = useAuth(auth.auth);

    const salir = async () => {
      try {
        const userRef = doc(db, "users", user.value.uid);

        await updateDoc(userRef, {
          estado: false,
        });

        await auth.auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };
    return {
      isAuthenticated,
      user,
      salir,
    };
  },
};
</script>
