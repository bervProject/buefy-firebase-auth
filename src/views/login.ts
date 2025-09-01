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
