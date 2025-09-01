<template>
  <div id="app">
    <router-view />
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import MyFooter from "@/components/MyFooter.vue";
import { getAuth } from "firebase/auth";
import firebaseClient from "@/firebaseClient";
import { useRouter } from "vue-router";

const firebaseAuth = getAuth(firebaseClient);

export default defineComponent({
  name: "App",
  components: {
    MyFooter,
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      firebaseAuth.onAuthStateChanged(
        (result) => {
          if (result) {
            router.replace("/home");
          }
        },
        (err) => {
          console.error("Auth error:", err.message);
        },
      );
    });

    return {};
  },
});
</script>
