<template>
  <q-page padding>
    <VistaAccesso v-if="!isAuthenticated" />
    <div v-else>
      <VistaUsuariosActivos />
    </div>
  </q-page>
</template>

<script>
import VistaAccesso from "../components/VistaAcceso.vue";
import VistaUsuariosActivos from "../components/VIstaUsuariosActivos.vue";
import { useAuth } from "@vueuse/firebase";
import { auth } from "boot/firebase";

export default {
  name: "IndexPage",
  components: {
    VistaAccesso,
    VistaUsuariosActivos,
  },
  setup() {
    const { isAuthenticated } = useAuth(auth.auth);

    return {
      isAuthenticated,
    };
  },
};
</script>
