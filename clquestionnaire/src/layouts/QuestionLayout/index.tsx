import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserdata from "../../hooks/useLoadUserdata";
import useNavPage from "../../hooks/useNavPage";
import { Spin } from "antd";

const QuestionLayout: FC = () => {
  // 获取用户信息
  const waitingUserdata = useLoadUserdata();
  // 处理页面合法跳转
  useNavPage(waitingUserdata);
  return (
    <div style={{ height: "100vh" }}>
      {waitingUserdata ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Spin></Spin>
        </div>
      ) : (
        <Outlet></Outlet>
      )}
    </div>
  );
};

export default QuestionLayout;
