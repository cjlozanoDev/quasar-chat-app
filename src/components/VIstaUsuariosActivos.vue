<template>
  <q-page-sticky position="top" expand>
    <q-tabs
      v-model="uidSeleccionado"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-primary text-white shadow-2 full-width"
    >
      <q-tab
        v-for="user in users"
        :key="user.uid"
        :name="user.id"
        icon="account_circle"
        :label="user.email"
        :class="user.estado ? 'text-white' : 'text-grey'"
      />
    </q-tabs>
  </q-page-sticky>
</template>

<script>
import { ref } from "vue";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "boot/firebase";

export default {
  name: "VistaUsuariosActivos",
  setup() {
    const uidSeleccionado = ref("");
    const users = ref([]);

    const q = query(collection(db, "users"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("Usuario nuevo: ", change.doc.data());
          users.value.push(change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Usuario modificado: ", change.doc.data());
          users.value = users.value.map((user) => {
            const userAux =
              user.uid === change.doc.data().uid
                ? { ...user, estado: change.doc.data().estado }
                : user;
            return userAux;
          });
        }
        if (change.type === "removed") {
          console.log("Usuario Borrado: ", change.doc.data());
        }
      });
    });

    return {
      uidSeleccionado,
      users,
    };
  },
};
</script>
