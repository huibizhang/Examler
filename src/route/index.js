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
    component: () => import("../views/MyBank.vue"),
  },
  {
    path: "/review/",
    name: "Review",
    component: () => import("../views/Review.vue"),
  },
  {
    path: "/mybank",
    name: "MyBank",
    component: () => import("../views/MyBank.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});