import React, { FC, useEffect } from "react";
import style from "./Login.module.scss";
import { Button, Checkbox, Form, Input, Space, Typography, message } from "antd";
import { LockOutlined, UserSwitchOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_LIST_PATHNAME, REGISTER_PATHNAME } from "../router";
import { useRequest } from "ahooks";
import { setUserToken } from "../utils/user-token";
//api
import { getUserLogin } from "../services/user";

const { Title } = Typography;

const Login: FC = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  // 发送登录请求
  const { run: handleLogin, loading: loadingLogin } = useRequest(
    async (values) => {
      const { username, password } = values;
      const res = await getUserLogin({ username, password });
      return res;
    },
    {
      manual: true,
      onSuccess(result) {
        message.success("登录成功,自动跳转到我的文卷");
        //存储token
        setUserToken(result.token);
        setTimeout(() => {
          nav(MANAGE_LIST_PATHNAME); //跳转到我的问卷页面
        });
      },
    }
  );

  useEffect(() => {
    /** 初始化表单 */
    let formInfo = localStorage.getItem("CL_FE_FORMINFO");
    if (formInfo) {
      form.setFieldsValue(JSON.parse(formInfo));
    }
  }, []);
  // 处理记住密码操作函数
  const handleRemember = (values: any) => {
    const { username, password } = values;
    if (values.remember) {
      localStorage.setItem("CL_FE_FORMINFO", JSON.stringify({ username, password }));
    } else {
      localStorage.removeItem("CL_FE_FORMINFO");
    }
  };
  const onFinish = (values: any) => {
    // 发送登录请求
    handleLogin(values);
    // 处理记住密码操作
    handleRemember(values);
  };
  return (
    <div className={style.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserSwitchOutlined />
          </Title>
          <Title level={3}>登录</Title>
        </Space>
      </div>
      <Form style={{ padding: "0 20px" }} form={form} initialValues={{ remember: true }} name="questionnaire_login" onFinish={onFinish}>
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
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit" disabled={loadingLogin}>
            立即登录
          </Button>
          Or <Link to={REGISTER_PATHNAME}>没有账号，去注册</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
