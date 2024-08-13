import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUserToken } from "../../utils/user-token";
import { Button, Space, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useGetUserinfo from "../../hooks/useGetUserinfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../../store/userReducer";
// 常量
import { LOGIN_PATHNAME } from "../../router";

const Logo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  //从user store中获取用户信息
  const { username, nickname } = useGetUserinfo();
  // 处理退出操作
  const handleExit = () => {
    removeUserToken(); //清除token
    dispatch(logoutReducer()); //清空 user store中的数据
    message.success("退出成功,将前往登录页面");
    setTimeout(() => {
      nav(LOGIN_PATHNAME);
    }, 1000);
  };
  return (
    <div>
      {username ? (
        <Space>
          <span style={{ color: "#e8e8e8" }}>
            <UserOutlined />
            {nickname}
          </span>
          <Button type="link" onClick={handleExit}>
            退出
          </Button>
        </Space>
      ) : (
        <Link to={LOGIN_PATHNAME}>登录</Link>
      )}
    </div>
  );
};

export default Logo;
