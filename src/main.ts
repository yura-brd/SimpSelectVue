import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
import IndexPage from "@/pages/IndexPage.vue";

const app = createApp(IndexPage);

// app.use(router);

app.mount("#app");
