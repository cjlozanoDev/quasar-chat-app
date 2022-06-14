<template>
  <q-page padding>
    <VistaAccesso v-if="!isAuthenticated" />
    <div v-else>
      <VistaUsuariosActivos />
      <VistaChat />
    </div>
  </q-page>
</template>

<script>
import VistaAccesso from "../components/VistaAcceso.vue";
import VistaUsuariosActivos from "../components/VIstaUsuariosActivos.vue";
import VistaChat from "../components/VistaChat.vue";
import { useAuth } from "@vueuse/firebase";
import { provide, ref } from "vue";
import { auth } from "boot/firebase";

export default {
  name: "IndexPage",
  components: {
    VistaAccesso,
    VistaUsuariosActivos,
    VistaChat,
  },
  setup() {
    const { isAuthenticated } = useAuth(auth.auth);

    const uidSeleccionado = ref("");
    provide("uidSeleccionado", uidSeleccionado);

    return {
      isAuthenticated,
    };
  },
};
</script>
