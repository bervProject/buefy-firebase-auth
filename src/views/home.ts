// @ is an alias to /src
import { defineComponent } from "vue";
import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithRedirect,
  TwitterAuthProvider,
  updateProfile,
  User,
} from "firebase/auth";
import firebaseClient from "@/firebaseClient";

const firebaseAuth = getAuth(firebaseClient);

export default defineComponent({
  name: "home",
  data() {
    return {
      name: "",
      photoUrl: "",
      email: "",
      input: {
        name: "",
        photoURL: "",
      },
      isLinkedGoogle: true,
      isLinkedGithub: true,
      isLinkedTwitter: true,
      isLinkedFacebook: true,
    };
  },
  methods: {
    logout(): void {
      firebaseAuth.signOut().then(() => {
        this.$router.replace("login");
      });
    },
    update(): void {
      const user = firebaseAuth.currentUser;
      if (user != null) {
        const loadingComponent = this.$buefy.loading.open({
          container: undefined,
        });
        updateProfile(user, {
          displayName: this.input.name,
          photoURL: this.input.photoURL,
        })
          .then(() => {
            loadingComponent.close();
            this.updateProfile(firebaseAuth.currentUser);
          })
          .catch((error) => {
            loadingComponent.close();
            this.$buefy.toast.open({
              message: `Error: ${error.message}`,
              type: "is-danger",
              duration: 5000,
            });
          });
      }
    },
    updateProfile(currentUser: User | null): void {
      if (currentUser) {
        this.email = currentUser.email || "";
        this.name = currentUser.displayName || "";
        this.photoUrl = currentUser.photoURL || "";
      }
    },
    deleteAccount(): void {
      const currentUser = firebaseAuth.currentUser;
      if (currentUser) {
        currentUser
          .delete()
          .then(() => {
            this.$router.replace("login");
          })
          .catch((err) => {
            this.$buefy.toast.open({
              message: `Error: ${err.message}`,
              type: "is-danger",
              duration: 5000,
            });
          });
      }
    },
    linkWithGithub(): void {
      const provider = new GithubAuthProvider();
      if (firebaseAuth.currentUser) {
        linkWithRedirect(firebaseAuth.currentUser, provider);
      }
    },
    linkWithGoogle(): void {
      const provider = new GoogleAuthProvider();
      if (firebaseAuth.currentUser) {
        linkWithRedirect(firebaseAuth.currentUser, provider);
      }
    },
    linkWithFacebook(): void {
      const provider = new FacebookAuthProvider();
      if (firebaseAuth.currentUser) {
        linkWithRedirect(firebaseAuth.currentUser, provider);
      }
    },
    linkWithTwitter(): void {
      const provider = new TwitterAuthProvider();
      if (firebaseAuth.currentUser) {
        linkWithRedirect(firebaseAuth.currentUser, provider);
      }
    },
  },

  mounted(): void {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      if (currentUser.email) {
        fetchSignInMethodsForEmail(firebaseAuth, currentUser.email).then(
          (result) => {
            this.isLinkedGoogle =
              result.findIndex((x) => x === "google.com") != -1;
            this.isLinkedGithub =
              result.findIndex((x) => x === "github.com") != -1;
            this.isLinkedFacebook =
              result.findIndex((x) => x === "facebook.com") != -1;
            this.isLinkedTwitter =
              result.findIndex((x) => x === "twitter.com") != -1;
          },
        );
      }
      this.updateProfile(currentUser);
      this.input.name = currentUser.displayName || "";
      this.input.photoURL = currentUser.photoURL || "";
    }
  },
});
