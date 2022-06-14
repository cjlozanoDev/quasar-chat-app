<template>
  <div v-if="uidSeleccionado !== ''" class="q-mt-xl">
    <div class="q-pa-md row justify-center q-mt-xl">
      <div style="width: 100%; max-width: 600px">
        <q-chat-message name="me" :text="['hey, how are you?']" sent />
        <q-chat-message name="Jane" :text="['doing fine, how r you?']" />
      </div>
    </div>
    <q-footer>
      <q-form @submit.prevent="enviarMensaje">
        <q-toolbar class="bg-primary text-white row">
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-input
            rounded
            outlined
            dense
            class="col-grow q-mr-sm"
            bg-color="white"
            v-model="message"
            placeholder="Type a message"
          />
          <q-btn round flat icon="send" type="submit" />
        </q-toolbar>
      </q-form>
    </q-footer>
  </div>
  <div v-else>
    <h5 class="q-mt-xl">Selecciona un usuario para hablar.</h5>
  </div>
</template>

<script>
import { ref, inject, watchEffect } from "vue";
import { useAuth } from "@vueuse/firebase";
import { auth, db } from "boot/firebase";
import { doc, addDoc, collection } from "firebase/firestore";

export default {
  setup() {
    const message = ref("");
    const uidSeleccionado = inject("uidSeleccionado");
    const { user } = useAuth(auth.auth);

    watchEffect(() => {
      console.log(uidSeleccionado.value);
    });

    const enviarMensaje = async () => {
      try {
        const objetoMensaje = {
          user: user.value.email,
          texto: message.value,
          fecha: Date.now(),
          uid: user.value.uid,
        };
        console.log(user.value.uid, uidSeleccionado.value);
        await addDoc(
          collection(db, "chat", user.value.uid, uidSeleccionado.value),
          objetoMensaje
        );
        console.log("he creado la primera");
        await addDoc(
          collection(db, "chat", uidSeleccionado.value, user.value.uid),
          objetoMensaje
        );
        console.log("he creado la segunda");
        message.value = "";
      } catch (error) {
        console.log("He dado error", error);
      }
    };

    return {
      message,
      enviarMensaje,
      uidSeleccionado,
    };
  },
};
</script>
