<template>
  <div v-if="uidSeleccionado !== ''" class="q-mt-xl" ref="RefChat">
    <div class="q-pa-md row justify-center q-mt-xl">
      <div style="width: 100%; max-width: 600px">
        <q-chat-message
          v-for="chat in chats"
          :key="chat.id"
          :name="chat.user"
          :text="[chat.texto]"
          :sent="chat.uid === user.uid"
        />
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
import { ref, inject, watch } from "vue";
import { useAuth } from "@vueuse/firebase";
import { auth, db } from "boot/firebase";
import {
  doc,
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

export default {
  setup() {
    const message = ref("");
    const uidSeleccionado = inject("uidSeleccionado");
    const { user } = useAuth(auth.auth);
    const chats = ref([]);
    const RefChat = ref(null);

    let unsubscribe;

    const obtenerData = (uidDelUsuarioSeleccionado) => {
      chats.value = [];
      const q = query(
        collection(db, "chat", user.value.uid, uidDelUsuarioSeleccionado),
        orderBy("fecha")
      );
      unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log("New city: ", change.doc.data());
            chats.value.push({ ...change.doc.data(), id: change.doc.id });
          }
          if (RefChat.value !== null) {
            setTimeout(() => {
              window.scrollTo(0, RefChat.value.scrollHeight);
            }, 50);
          }
        });
      });
    };

    watch(
      () => uidSeleccionado.value,
      (newUid) => {
        if (unsubscribe) {
          unsubscribe();
          if (newUid) {
            obtenerData(newUid);
          }
        } else {
          obtenerData(newUid);
        }
      }
    );
    const enviarMensaje = async () => {
      if (!message.value.trim()) return;
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
      chats,
      user,
      RefChat,
    };
  },
};
</script>
