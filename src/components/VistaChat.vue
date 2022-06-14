<template>
  <div class="q-pa-md row justify-center q-mt-xl">
    <div style="width: 100%; max-width: 600px">
      <q-chat-message name="me" :text="['hey, how are you?']" sent />
      <q-chat-message name="Jane" :text="['doing fine, how r you?']" />
    </div>
  </div>
  <q-footer>
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
  </q-footer>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const message = ref("");

    return {
      message,
    };
  },
};
</script>
