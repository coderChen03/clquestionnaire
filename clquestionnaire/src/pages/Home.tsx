import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.scss";
import { MANAGE_LIST_PATHNAME } from "../router";
import { Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();

  return (
    <div className={style.container}>
      <Title>问卷调查 | 在线投票</Title>
      <Paragraph>已累计创建问卷 2000+ 份 ,发放问卷 500+ 份 , 收到答卷 9999+ 份</Paragraph>
      <Button type="primary" size="large" onClick={() => nav(MANAGE_LIST_PATHNAME)}>
        开始使用
      </Button>
    </div>
  );
};
export default Home;
