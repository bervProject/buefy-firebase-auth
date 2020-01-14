<template>
  <div id="app">
    <router-view />
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from "@/components/MyFooter.vue";

export default {
  components: {
    MyFooter
  }
};
</script>

<style lang="scss" src="./App.scss" />
