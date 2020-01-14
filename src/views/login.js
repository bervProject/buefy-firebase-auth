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
        container: null
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
