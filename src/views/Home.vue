<template>
  <section class="section">
    <div class="container">
      <div class="content has-text-centered">
        <h1 class="title">
          Firebase Auth Demo
        </h1>
        <section class="section">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img v-if="photoUrl" :src="photoUrl" />
                    <img
                      v-else
                      src="https://bulma.io/images/placeholders/96x96.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p v-if="name" class="title is-4">{{ name }}</p>
                  <p v-else class="title is-4">User</p>
                  <p class="subtitle is-6">{{ email }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section">
          <h2 class="title">Update Profile</h2>
          <b-field label="Name">
            <b-input type="text" v-model="input.name"></b-input>
          </b-field>
          <b-field label="Photo URL">
            <b-input type="url" v-model="input.photoURL"></b-input>
          </b-field>
          <div class="buttons">
            <button class="button is-link" @click="update">Update</button>
            <button class="button is-danger" @click="logout">Logout</button>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
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
          container: true
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
</script>
