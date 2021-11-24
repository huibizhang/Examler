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
    component: () => import("../views/Exam.vue"),
  },
  {
    path: "/review/",
    name: "Review",
    component: () => import("../views/Review.vue"),
  },
  {
    path: "/history/",
    name: "History",
    component: () => import("../views/History.vue"),
  },
  {
    path: "/setting/",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/add/",
    name: "Add",
    component: () => import("../views/Add.vue"),
  },
  {
    path: "/banks/",
    name: "Banks",
    component: () => import("../views/Banks.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});