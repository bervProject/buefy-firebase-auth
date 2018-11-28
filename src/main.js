import Vue from "vue";
import Buefy from "buefy";
import firebase from "firebase/app";
import "firebase/auth";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store";

let app = "";

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DB_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MSG_SENDER_ID
};

firebase.initializeApp(config);

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fa"
});
Vue.use(VeeValidate);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
