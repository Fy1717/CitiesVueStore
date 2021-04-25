import { createWebHistory, createRouter } from "vue-router";
import Cities from "../components/Cities.vue";
import City from "../components/City.vue";

const routes = [{
    path: "/",
    name: "Cities",
    component: Cities,
  },
  {
    path: "/city/:url",
    name: "City",
    component: City,
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;