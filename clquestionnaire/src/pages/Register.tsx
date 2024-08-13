import React, { FC, useState } from "react";

import { Button, Form, Input, Space, Typography, message } from "antd";
import { LockOutlined, UserAddOutlined, UserOutlined, KeyOutlined, SmileOutlined } from "@ant-design/icons";
import style from "./Register.module.scss";

import { Link, useNavigate } from "react-router-dom";
//常量
import { LOGIN_PATHNAME } from "../router";

import { useRequest } from "ahooks";
import { getUserRegister, userinfoType } from "../services/user";

const { Title } = Typography;

const Register: FC = () => {
  const nav = useNavigate();
  const [userinfo, setUserinfo] = useState<userinfoType>({ username: "", password: "" });
  // 注册请求
  const { run: handleRegister, loading: loadingRegister } = useRequest(async () => await getUserRegister(userinfo), {
    manual: true,
    onSuccess() {
      message.success("注册成功,自动跳转到登录页");
      setTimeout(() => {
        nav("/login");
      }, 1000);
    },
  });
  // 注册的回调
  const onFinish = (values: any) => {
    const { username, password, nickname } = values;
    setUserinfo({ username, password, nickname: nickname ? nickname : username });
    handleRegister();
  };
  return (
    <div className={style.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={3}>注册</Title>
        </Space>
      </div>
      <Form style={{ padding: "0 20px" }} name="questionnaire_login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "请输入用户名" },
            { type: "string", min: 4, max: 20, message: "字符长度在 4-20 之间" },
            { pattern: /^\w+$/, message: "只能是字母数字下划线" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { type: "string", min: 5, max: 20, message: "字符长度在 5-20 之间" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          rules={[
            { required: true, message: "Please input your Password again!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次密码不相同"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<KeyOutlined />} placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item name="nickname">
          <Input prefix={<SmileOutlined />} placeholder="Nickname" />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit" disabled={loadingRegister}>
            立即注册
          </Button>
          Or <Link to={LOGIN_PATHNAME}>已有账号，去登录</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
