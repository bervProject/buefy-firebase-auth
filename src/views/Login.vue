<template>
  <section>
    <div class="container">
      <h1 id="title" class="title has-text-centered">Vue Bulma with Firebase Auth</h1>
      <div id="login-box" class="card">
        <div class="card-content">
          <h1 class="title">Login</h1>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(login)">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors, failed, passed }"
              >
                <b-field
                  label="Email"
                  :type="{ 'is-danger': failed, 'is-success': passed }"
                  :message="errors[0]"
                >
                  <b-input type="email" v-model="email" maxlength="30"></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                name="password"
                rules="required"
                v-slot="{ errors, failed, passed }"
              >
                <b-field
                  label="Password"
                  :type="{ 'is-danger': failed, 'is-success': passed }"
                  :message="errors[0]"
                >
                  <b-input type="password" v-model="password" password-reveal></b-input>
                </b-field>
              </ValidationProvider>
              <section class="section">
                <div class="content has-text-centered">
                  <button class="button is-primary">Login</button>
                </div>
              </section>
            </form>
          </ValidationObserver>
        </div>
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
      const loadingComponent = this.$buefy.loading.open({
        container: true
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            loadingComponent.close();
            this.$router.replace("home");
            this.$buefy.toast.open({
              message: `Welcome home ${user.user.email}`,
              type: "is-success",
              duration: 5000
            });
          },
          err => {
            loadingComponent.close();
            this.$buefy.toast.open({
              message: `Error: ${err.message}`,
              type: "is-danger",
              duration: 5000
            });
          }
        );
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
