// @ is an alias to /src
import firebase from "firebase/app";

export default {
  name: "home",
  data() {
    return {
      name: "",
      photoUrl: "",
      email: "",
      input: {
        name: "",
        photoURL: ""
      }
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    update: function() {
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
    },
    updateProfile: function(currentUser) {
      this.email = currentUser.email;
      this.name = currentUser.displayName;
      this.photoUrl = currentUser.photoURL;
    }
  },
  mounted: function() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.updateProfile(currentUser);
      this.input.name = currentUser.displayName;
      this.input.photoURL = currentUser.photoURL;
    }
  }
};
