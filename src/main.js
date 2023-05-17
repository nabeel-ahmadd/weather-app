import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import "primeicons/primeicons.css";
import Unicon from "vue-unicons";
import {
  uniCloudShowersHeavy,
  uniWind,
  uniSun,
  uniTemperature,
  uniTemperatureEmpty,
} from "vue-unicons/dist/icons";

import BaseDialog from "./components/ui/BaseDialog.vue";
import BaseLoader from "./components/ui/BaseLoader.vue";

Unicon.add([
  uniCloudShowersHeavy,
  uniWind,
  uniSun,
  uniTemperature,
  uniTemperatureEmpty,
]);

const app = createApp(App);
app.component("base-dialog", BaseDialog);
app.component("base-loader", BaseLoader);
app.use(Unicon);
app.mount("#app");
