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
    firebase
      .auth()
      .getRedirectResult()
      .catch(err => {
        if (err) {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: "is-danger",
            duration: 9000
          });
        }
      });
  }
}
</script>

<style lang="scss" src="./App.scss" />
