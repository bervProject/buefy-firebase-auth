import Vue from "vue";
import Component from "vue-class-component";
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  TwitterAuthProvider,
} from "firebase/auth";
import firebaseClient from "@/firebaseClient";

const firebaseAuth = getAuth(firebaseClient);

@Component({
  name: "login",
})
export default class Login extends Vue {
  email: string = "";
  password: string = "";

  login(): void {
    const loadingComponent = this.$buefy.loading.open({
      container: null,
    });
    signInWithEmailAndPassword(firebaseAuth, this.email, this.password).then(
      (response) => {
        loadingComponent.close();
        if (response.user) {
          this.$router.replace("home");
          this.$buefy.toast.open({
            message: `Welcome home ${response.user.email}`,
            type: "is-success",
            duration: 5000,
          });
        } else {
          this.$buefy.toast.open({
            message: `Can't get user information.`,
            type: "is-warning",
            duration: 5000,
          });
        }
      },
      (err) => {
        loadingComponent.close();
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: "is-danger",
          duration: 5000,
        });
      },
    );
  }

  loginWithGoogle(): void {
    const loadingComponent = this.$buefy.loading.open({
      container: null,
    });
    const provider = new GoogleAuthProvider();
    signInWithRedirect(firebaseAuth, provider)
      .then(() => {
        loadingComponent.close();
      })
      .catch((err) => {
        loadingComponent.close();
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: "is-danger",
          duration: 5000,
        });
      });
  }

  loginWithGithub(): void {
    const loadingComponent = this.$buefy.loading.open({
      container: null,
    });
    const provider = new GithubAuthProvider();
    signInWithRedirect(firebaseAuth, provider)
      .then(() => {
        loadingComponent.close();
      })
      .catch((err) => {
        loadingComponent.close();
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: "is-danger",
          duration: 5000,
        });
      });
  }

  loginWithFacebook(): void {
    const loadingComponent = this.$buefy.loading.open({
      container: null,
    });
    const provider = new FacebookAuthProvider();

    signInWithRedirect(firebaseAuth, provider)
      .then(() => {
        loadingComponent.close();
      })
      .catch((err) => {
        loadingComponent.close();
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: "is-danger",
          duration: 5000,
        });
      });
  }

  loginWithTwitter(): void {
    const loadingComponent = this.$buefy.loading.open({
      container: null,
    });
    const provider = new TwitterAuthProvider();
    signInWithRedirect(firebaseAuth, provider)
      .then(() => {
        loadingComponent.close();
      })
      .catch((err) => {
        loadingComponent.close();
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: "is-danger",
          duration: 5000,
        });
      });
  }
}
