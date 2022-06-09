<template>
  <q-page padding>
    <VistaAccesso v-if="!isAuthenticated" />
  </q-page>
</template>

<script>
import VistaAccesso from "../components/VistaAcceso.vue";
import { useAuth } from "@vueuse/firebase";
import { auth } from "boot/firebase";

export default {
  name: "IndexPage",
  components: {
    VistaAccesso,
  },
  setup() {
    const { isAuthenticated } = useAuth(auth.auth);

    return {
      isAuthenticated,
    };
  },
};
</script>
