import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
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

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const login = () => {
      signInWithEmailAndPassword(firebaseAuth, email.value, password.value).then(
        (response) => {
          if (response.user) {
            router.replace("/home");
            console.log(`Welcome home ${response.user.email}`);
          } else {
            console.log("Can't get user information.");
          }
        },
        (err) => {
          console.error("Error:", err.message);
        }
      );
    };

    const loginWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(firebaseAuth, provider).catch((err) => {
        console.error("Error:", err.message);
      });
    };

    const loginWithGithub = () => {
      const provider = new GithubAuthProvider();
      signInWithRedirect(firebaseAuth, provider).catch((err) => {
        console.error("Error:", err.message);
      });
    };

    const loginWithFacebook = () => {
      const provider = new FacebookAuthProvider();
      signInWithRedirect(firebaseAuth, provider).catch((err) => {
        console.error("Error:", err.message);
      });
    };

    const loginWithTwitter = () => {
      const provider = new TwitterAuthProvider();
      signInWithRedirect(firebaseAuth, provider).catch((err) => {
        console.error("Error:", err.message);
      });
    };

    return {
      email,
      password,
      login,
      loginWithGoogle,
      loginWithGithub,
      loginWithFacebook,
      loginWithTwitter,
    };
  },
});
      email: "",
      password: "",
    };
  },
  methods: {
    login(): void {
      const loadingComponent = this.$buefy.loading.open({
        container: undefined,
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
    },
    loginWithGoogle(): void {
      const loadingComponent = this.$buefy.loading.open({
        container: undefined,
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
    },
    loginWithGithub(): void {
      const loadingComponent = this.$buefy.loading.open({
        container: undefined,
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
    },
    loginWithFacebook(): void {
      const loadingComponent = this.$buefy.loading.open({
        container: undefined,
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
    },
    loginWithTwitter(): void {
      const loadingComponent = this.$buefy.loading.open({
        container: undefined,
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
    },
>>>>>>> origin/main
  },
});
