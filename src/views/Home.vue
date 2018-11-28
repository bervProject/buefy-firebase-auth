<template>
  <section>
    <div class="container">
      <div class="content has-text-centered">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld :msg="`Hello ${this.email}`"/>
        <p class="content">Email: {{email}}</p>
        <button class="button is-danger" @click="logout">Logout</button>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase/app";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      email: ""
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  },
  mounted: function() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.email = currentUser.email;
    }
  }
};
</script>
