<template>
  <div id="app">
    <router-view />
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
import MyFooter from "@/components/MyFooter.vue";
import Component from "vue-class-component";
import Vue from "vue";
import { getAuth } from "firebase/auth";
import firebaseClient from "@/firebaseClient";

const firebaseAuth = getAuth(firebaseClient);

@Component({
  name: "app",
  components: {
    MyFooter,
  },
})
export default class App extends Vue {
  mounted() {
    const loadingComponent = this.$buefy.loading.open({
      container: null,
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
      }
    );
  }
}
</script>

<style lang="scss" src="./App.scss" />
