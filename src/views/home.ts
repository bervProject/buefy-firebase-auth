import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  updateProfile,
} from "firebase/auth";
import firebaseClient from "@/firebaseClient";

const firebaseAuth = getAuth(firebaseClient);

export default defineComponent({
  name: "Home",
  setup() {
    const router = useRouter();
    const name = ref<string | null>("");
    const photoUrl = ref<string | null>("");
    const email = ref<string | null>("");
    const input = ref({
      name: "",
      photoURL: "",
    });

    const logout = () => {
      firebaseAuth.signOut().then(() => {
        router.replace("/login");
      });
    };

    const updateUserProfile = () => {
      const user = firebaseAuth.currentUser;
      if (user != null) {
        updateProfile(user, {
          displayName: input.value.name,
          photoURL: input.value.photoURL,
        })
          .then(() => {
            console.log("Profile updated");
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      }
    };

    const deleteAccount = () => {
      const user = firebaseAuth.currentUser;
      if (user) {
        user
          .delete()
          .then(() => {
            router.replace("/login");
          })
          .catch((err) => {
            console.error("Error:", err.message);
          });
      }
    };

    onMounted(() => {
      const user = firebaseAuth.currentUser;
      if (user) {
        name.value = user.displayName;
        photoUrl.value = user.photoURL;
        email.value = user.email;
        input.value.name = user.displayName || "";
        input.value.photoURL = user.photoURL || "";
      }
    });

    const linkWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      // Implementation for linking Google account
    };

    const linkWithGithub = () => {
      const provider = new GithubAuthProvider();
      // Implementation for linking Github account
    };

    const linkWithFacebook = () => {
      const provider = new FacebookAuthProvider();
      // Implementation for linking Facebook account
    };

    const linkWithTwitter = () => {
      const provider = new TwitterAuthProvider();
      // Implementation for linking Twitter account
    };

    return {
      name,
      photoUrl,
      email,
      input,
      logout,
      updateUserProfile,
      deleteAccount,
      linkWithGoogle,
      linkWithGithub,
      linkWithFacebook,
      linkWithTwitter,
    };
  },
});
