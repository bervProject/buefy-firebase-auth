<template>
  <div id="app">
    <router-view />
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
import firebase from "firebase/app";
import MyFooter from "@/components/MyFooter.vue";
import Component from "vue-class-component";
import Vue from "vue";

@Component({
  name: "app",
  components: {
    MyFooter
  }
})
export default class App extends Vue {
  mounted() {
    const loadingComponent = this.$buefy.loading.open({
      container: null
    });
    firebase.auth().onAuthStateChanged(
      result => {
        loadingComponent.close();
        if (result) {
          this.$router.replace("home");
        }
      },
      err => {
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: "is-danger",
          duration: 9000
        });
      }
    );
  }
}
</script>

<style lang="scss" src="./App.scss" />
