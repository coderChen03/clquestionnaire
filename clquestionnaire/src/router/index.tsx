import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// layout 组件
import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
// pages 组件
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
/** manage */
import List from "../pages/manage/List";
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";
/** question */
// import Edit from "../pages/question/Edit";
// import Statist from "../pages/question/Statist";
// 编辑页和统计页是在点击后才会去显示，利用路由懒加载 优化首页体积
const Edit = lazy(() => import(/* webpackChunkName:'editPage' */ "../pages/question/Edit"));
const Statist = lazy(() => import(/* webpackChunkName:'statistPage' */ "../pages/question/Statist"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "manage",
        element: <ManageLayout></ManageLayout>,
        children: [
          {
            path: "list",
            element: <List></List>,
          },
          {
            path: "star",
            element: <Star></Star>,
          },
          {
            path: "trash",
            element: <Trash></Trash>,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: "edit/:id",
        element: <Edit></Edit>,
      },
      {
        path: "statist/:id",
        element: <Statist></Statist>,
      },
    ],
  },
]);

export default router;

/**--------分割线--------- */
// 导出一些常用的路由常量 便于以后维护
export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_LIST_PATHNAME = "/manage/list";
// 判断是否为登录页面方法
export const isLoginOrRegisterPath = (pathname: string) => {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
};
//判断是否为不需要登录的页面方法
export const isNONeedUserinfoPath = (pathname: string) => {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
};
