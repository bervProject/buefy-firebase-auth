import firebase from "firebase/app";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "login"
})
export default class Login extends Vue {
  email: string = "";
  password: string = "";

  login(): void {
    const loadingComponent = this.$buefy.loading.open({
      container: null
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(
        response => {
          loadingComponent.close();
          if (response.user) {
            this.$router.replace("home");
            this.$buefy.toast.open({
              message: `Welcome home ${response.user.email}`,
              type: "is-success",
              duration: 5000
            });
          } else {
            this.$buefy.toast.open({
              message: `Can't get user information.`,
              type: "is-warning",
              duration: 5000
            });
          }
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

  loginWithGoogle(): void {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  loginWithGithub(): void {
    let provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  loginWithFacebook(): void {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  loginWithTwitter(): void {
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
}
