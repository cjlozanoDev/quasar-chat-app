<template>
  <div class="q-px-xl">
    <h5>Formulario de {{ textoRegistroLogin }}</h5>
    <q-form class="q-gutter-md" @submit.prevent="procesarFormulario">
      <q-input label="Email" v-model="email" />
      <q-input label="Password" v-model="password" />
      <q-btn :label="textoRegistroLogin" type="submit" color="primary" />
      <q-btn v-if="!acceder" color="primary" outline @click="acceder = true">
        ¿Ya tienes cuenta?
      </q-btn>
      <q-btn v-else color="negative" outline @click="acceder = false">
        ¿No tienes cuenta?
      </q-btn>
    </q-form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { auth } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const acceder = ref(true);
    const textoRegistroLogin = computed(() =>
      acceder.value ? "Login" : "Registro"
    );

    const { isAuthenticated, user } = useAuth(auth.auth);

    const procesarFormulario = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        console.log("campos vacíos");
        return;
      }
      try {
        if (!acceder.value) {
          // Registrar

          const user = await auth.createUserWithEmailAndPassword(
            auth.auth,
            email.value,
            password.value
          );
          console.log(user.user);
        } else {
          // Login
          console.log("voy a llamar a usario");
          const user = await auth.signInWithEmailAndPassword(
            auth.auth,
            email.value,
            password.value
          );
          console.log("EL usuario es", user.user);
        }
        email.value = "";
        password.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    return {
      email,
      password,
      procesarFormulario,
      textoRegistroLogin,
      acceder,
      isAuthenticated,
      user,
    };
  },
};
</script>
