<template>
  <div id="app">
    <router-view />
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MyFooter from "./components/MyFooter.vue";
import { getAuth } from "firebase/auth";
import firebaseClient from "@/firebaseClient";

const firebaseAuth = getAuth(firebaseClient);

export default defineComponent({
  name: "app",
  components: {
    MyFooter,
  },
  mounted() {
    const loadingComponent = this.$buefy.loading.open({
      container: undefined,
    });
    firebaseAuth.onAuthStateChanged(
      (result) => {
        loadingComponent.close();
        if (result) {
          this.$router.replace("home");
        }
      },
      (err) => {
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: "is-danger",
          duration: 9000,
        });
      },
    );
  },
});
</script>
