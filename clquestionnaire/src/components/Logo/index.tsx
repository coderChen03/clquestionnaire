import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import useGetUserinfo from "../../hooks/useGetUserinfo";
import { MANAGE_LIST_PATHNAME, HOME_PATHNAME } from "../../router";

const { Title } = Typography;

const Logo: FC = () => {
  const [path, setPath] = useState("/");
  // 从 user store中获取用户信息
  const { username, nickname } = useGetUserinfo();
  useEffect(() => {
    // 存在用户信息跳转到我的问卷页 反之跳转到 home页
    if (username) {
      setPath(MANAGE_LIST_PATHNAME);
    } else {
      setPath(HOME_PATHNAME);
    }
  }, [username, nickname]);
  return (
    <div className={style.container}>
      <Link to={path}>
        <Space>
          <Title>
            <FormOutlined></FormOutlined>
          </Title>
          <Title>ALei问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
