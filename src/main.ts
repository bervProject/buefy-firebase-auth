import { createApp } from 'vue';
import Buefy from "buefy";
import { defineRule } from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'buefy/dist/buefy.css';

const app = createApp(App);

app.use(Buefy, {
  defaultIconPack: "fa",
});
app.use(store);
app.use(router);

defineRule('email', (value: any) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }

  // Check if email
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return 'This field must be a valid email';
  }

  return true;
});
defineRule("required", (value: any) => {
    if (!value || !value.length) {
    return 'This field is required';
  }

  return true;
});

app.mount("#app");