import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/exam/",
    name: "Exam",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/review/",
    name: "Review",
    component: () => import("../views/Review.vue"),
  },
  {
    path: "/setting/",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});