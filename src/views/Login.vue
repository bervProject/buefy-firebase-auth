<template>
  <section>
    <div class="container">
      <h1 id="title" class="title has-text-centered">Vue Bulma with Firebase Auth</h1>
      <div id="login-box" class="box">
        <h1 class="title">Login</h1>
        <form @submit.prevent="login">
          <b-field
            label="Email"
            :type="{'is-danger': errors.has('email')}"
            :message="errors.first('email')"
          >
            <b-input
              type="email"
              name="email"
              v-model="email"
              v-validate="'required|email|max:30'"
              maxlength="30"
            ></b-input>
          </b-field>

          <b-field
            label="Password"
            :type="{'is-danger': errors.has('password')}"
            :message="errors.first('password')"
          >
            <b-input
              type="password"
              name="password"
              v-model="password"
              v-validate="'required|min:8'"
              password-reveal
            ></b-input>
          </b-field>

          <button class="button is-primary">Login</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(
              user => {
                this.$router.replace("home");
                this.$toast.open({
                  message: `Welcome home ${user.user.displayName}`,
                  type: "is-success",
                  duration: 5000
                });
              },
              err => {
                this.$toast.open({
                  message: `Error: ${err.message}`,
                  type: "is-danger",
                  duration: 5000
                });
              }
            );
        } else {
          this.$toast.open({
            message: "Form is not valid! Please check the fields.",
            type: "is-danger"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
#title {
  margin-top: 100px;
}

#login-box {
  margin: 50px;
}
</style>

