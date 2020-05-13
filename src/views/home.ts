// @ is an alias to /src
import firebase from "firebase/app";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "home"
})
export default class Home extends Vue {
  name: string | null = "";
  photoUrl: string | null = "";
  email: string | null = "";
  input: any = {
    name: "",
    photoURL: ""
  };
  isLinkedGoogle: boolean = true;
  isLinkedGithub: boolean = true;
  isLinkedTwitter: boolean = true;
  isLinkedFacebook: boolean = true;

  logout(): void {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.replace("login");
      });
  }

  update(): void {
    const user = firebase.auth().currentUser;
    if (user != null) {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      });
      user
        .updateProfile({
          displayName: this.input.name,
          photoURL: this.input.photoURL
        })
        .then(() => {
          loadingComponent.close();
          this.updateProfile(firebase.auth().currentUser);
        })
        .catch(error => {
          loadingComponent.close();
          this.$buefy.toast.open({
            message: `Error: ${error.message}`,
            type: "is-danger",
            duration: 5000
          });
        });
    }
  }
  updateProfile(currentUser: firebase.User | null): void {
    if (currentUser) {
      this.email = currentUser.email;
      this.name = currentUser.displayName;
      this.photoUrl = currentUser.photoURL;
    }
  }
  deleteAccount(): void {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      currentUser
        .delete()
        .then(_ => {
          this.$router.replace("login");
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: "is-danger",
            duration: 5000
          });
        });
    }
  }
  linkWithGithub(): void {
    let provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().currentUser?.linkWithRedirect(provider);
  }
  linkWithGoogle(): void {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().currentUser?.linkWithRedirect(provider);
  }
  linkWithFacebook(): void {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().currentUser?.linkWithRedirect(provider);
  }
  linkWithTwitter(): void {
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().currentUser?.linkWithRedirect(provider);
  }
  mounted(): void {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      if (currentUser.email) {
        firebase
          .auth()
          .fetchSignInMethodsForEmail(currentUser.email)
          .then(result => {
            this.isLinkedGoogle =
              result.findIndex(x => x === "google.com") != -1;
            this.isLinkedGithub =
              result.findIndex(x => x === "github.com") != -1;
            this.isLinkedFacebook =
              result.findIndex(x => x === "facebook.com") != -1;
            this.isLinkedTwitter =
              result.findIndex(x => x === "twitter.com") != -1;
            console.log(result);
          });
      }
      this.updateProfile(currentUser);
      this.input.name = currentUser.displayName;
      this.input.photoURL = currentUser.photoURL;
    }
  }
}
