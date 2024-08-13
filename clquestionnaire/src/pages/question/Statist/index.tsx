import React, { FC, useState } from "react";
import { useTitle } from "ahooks";
import { Button, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import StatHeader from "./StatHeader";
import LeftList from "./LeftList";
import StatTable from "./StatTable";
import StatChart from "./StatChart";

import style from "./index.module.scss";

const Statist: FC = () => {
  const nav = useNavigate();
  // 使用自定义hooks抽取公共部分 (获取请求数据)
  const { loading } = useLoadQuestionData();
  // 获取页面信息
  const { title, isPublished } = useGetPageInfo();
  // 定义供左中右面板使用的 selectedId type (将公共状态提升到父组件身上)
  const [selectedId, setSelectedId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  // 修改网页title
  useTitle(`统计问卷-${title}`);
  /* loading效果 */
  if (loading) {
    <Spin style={{ width: "100%", textAlign: "center", marginTop: "24px" }}></Spin>;
  }
  /* 判断是否发布  注意:为了防止闪屏 isPublished不设置默认值 */
  if (typeof isPublished === "boolean" && !isPublished) {
    return (
      <Result
        status="warning"
        title="该问卷没有发布!"
        extra={
          <Button type="primary" onClick={() => nav(-1)}>
            返回
          </Button>
        }
      />
    );
  }
  return (
    <div className={style.container}>
      <StatHeader />
      <div className={style["container-wrapper"]}>
        <div className={style.content}>
          <div className={style.left}>
            <LeftList selectedId={selectedId} setSelectedId={setSelectedId} setSelectedType={setSelectedType} />
          </div>
          <div className={style.main}>
            <StatTable selectedId={selectedId} setSelectedId={setSelectedId} setSelectedType={setSelectedType} />
          </div>
          <div className={style.right}>
            <StatChart selectedType={selectedType} selectedId={selectedId} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Statist;
