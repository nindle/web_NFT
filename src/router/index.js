import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/home")
  },
  {
    path: "/bazaar",
    name: "bazaar",
    component: () =>
      import(/* webpackChunkName: "Example" */ "../views/bazaar/index")
  },
  {
    path: "/details/:token/:id",
    name: "details",
    component: () =>
      import(/* webpackChunkName: "details" */ "../views/details/index")
  },
  {
    path: "/establish",
    name: "establish",
    component: () =>
      import(/* webpackChunkName: "establish" */ "../views/establish/index")
  },
  {
    path: "/establishs",
    name: "establishs",
    component: () =>
      import(/* webpackChunkName: "establish" */ "../views/details/establish")
  },
  {
    path: "/purchase",
    name: "purchase",
    component: () =>
      import(/* webpackChunkName: "purchase" */ "../views/details/purchase")
  },
  {
    path: "/personalCenter/:address",
    name: "personalCenter",
    component: () =>
      import(
        /* webpackChunkName: "personalCenter" */ "../views/personalCenter/index"
      )
  },
  {
    path: "/redactUser",
    name: "redactUser",
    component: () =>
      import(/* webpackChunkName: "redactUser" */ "../views/redactUser/index")
  },
  {
    path: "/Merchantshomepage",
    name: "Merchantshomepage",
    component: () =>
      import(
        /* webpackChunkName: "Merchantshomepage" */ "../views/Merchantshomepage/index"
      )
  },

  {
    path: "/single",
    name: "single",
    component: () =>
      import(/* webpackChunkName: "single" */ "../views/establish/single")
  },
  {
    path: "/Multiple",
    name: "multiple",
    component: () =>
      import(/* webpackChunkName: "Multiple" */ "../views/establish/multiple")
  },
  {
    path: "/Weiqi",
    name: "Weiqi",
    component: () =>
      import(/* webpackChunkName: "Multiple" */ "../views/establish/weiqi")
  },
  {
    path: "/putaway",
    name: "putaway",
    component: () =>
      import(/* webpackChunkName: "putaway" */ "../views/putaway/index")
  },
  {
    path: "/compile",
    name: "compile",
    component: () =>
      import(/* webpackChunkName: "compile" */ "../views/compile/index")
  },
  {
    path: "/grounding",
    name: "grounding",
    component: () =>
      import(/* webpackChunkName: "grounding" */ "../views/grounding/index")
  },
  {
    path: "/modification",
    name: "modification",
    component: () =>
      import(
        /* webpackChunkName: "modification" */ "../views/modification/index"
      )
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/index")
  }
];

const router = new VueRouter({
  routes
});

export default router;
