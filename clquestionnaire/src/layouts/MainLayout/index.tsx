import React, { FC } from "react";
import Logo from "../../components/Logo";
import Userinfo from "../../components/Userinfo";
import { Outlet } from "react-router-dom";
import style from "./index.module.scss";
import { Layout, Spin } from "antd";
import useLoadUserdata from "../../hooks/useLoadUserdata";
import useNavPage from "../../hooks/useNavPage";

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  // 获取用户信息
  const waitingUserdata = useLoadUserdata();
  // 处理页面合法跳转
  useNavPage(waitingUserdata);
  return (
    <Layout>
      <Header className={style.header}>
        <div className={style.left}>
          <Logo></Logo>
        </div>
        <div className={style.right}>{waitingUserdata ? <Spin></Spin> : <Userinfo></Userinfo>}</div>
      </Header>
      <Content className={style.main}>
        <Outlet></Outlet>
      </Content>
      <Footer className={style.footer}>alei问卷 &copy;2024 - present. Created by alei</Footer>
    </Layout>
  );
};

export default MainLayout;
