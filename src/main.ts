import { createApp } from "vue";
import Buefy from "buefy";
import "bulma/css/bulma.css";
import "buefy/dist/css/buefy.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(Buefy, {
  defaultIconPack: "fa",
});
app.use(router);
app.use(store);

app.mount("#app");
