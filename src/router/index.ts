import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BasicUsage from "../views/Vis/BasicUsage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/basicUsage",
    name: "basicUsage",
    component: BasicUsage,
  },
  {
    path: "/scalingCustom",
    name: "scalingCustom",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Vis/ScalingCustom.vue"),
  },
  {
    path: "/dynamicData",
    name: "dynamicData",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Vis/DynamicData.vue"),
  },
  {
    path: "/neo4jDriver",
    name: "neo4jDriver",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Vis/Neo4jDriver.vue"),
  },
  {
    path: "/neo4jDriversShow",
    name: "neo4jDriversShow",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Vis/Neo4jDriverTest.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
