import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Form, Button, Input, Row, Col } from "ant-design-vue";

import "vis/dist/vis.min.css";
import "ant-design-vue/dist/antd.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Form)
  .use(Button)
  .use(Input)
  .use(Row)
  .use(Col)
  .mount("#app");
