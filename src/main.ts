import Vue from "vue";
import Buefy from "buefy";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email } from "vee-validate/dist/rules";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fa",
});
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
extend("email", email);
extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1,
    };
  },
  computesRequired: true,
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
