import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import { Button, Space, Divider, message } from "antd";
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons";
import { createQuestion } from "../../services/question";
import { useRequest } from "ahooks";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  // 拿到当前 url
  const { pathname } = useLocation();

  // 使用第三方 hooks useRequest重构创建文件方法 为了 控制请求中的三种状态 loading data error
  const { loading, run } = useRequest(createQuestion, {
    manual: true,
    onSuccess(result) {
      //跳转到编辑页
      nav(`/question/edit/${result.id}`);
      message.success("创建成功");
    },
  });

  return (
    <div className={style.container}>
      <div className={style.left}>
        <Space direction="vertical">
          <Button type="primary" disabled={loading} size="large" icon={<PlusOutlined />} onClick={run}>
            创建问卷
          </Button>
          {/* 分割线 */}
          <Divider></Divider>
          <Button type={pathname.startsWith("/manage/list") ? "default" : "text"} size="large" icon={<BarsOutlined />} onClick={() => nav("/manage/list")}>
            我的问卷
          </Button>
          <Button type={pathname.startsWith("/manage/star") ? "default" : "text"} size="large" icon={<StarOutlined />} onClick={() => nav("/manage/star")}>
            星标问卷
          </Button>
          <Button type={pathname.startsWith("/manage/trash") ? "default" : "text"} size="large" icon={<DeleteOutlined />} onClick={() => nav("/manage/trash")}>
            回收站
          </Button>
        </Space>
      </div>
      <div className={style.right}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ManageLayout;
