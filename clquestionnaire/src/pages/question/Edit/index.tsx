import React, { FC } from "react";
import { useTitle } from "ahooks";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { changeSelectedId } from "../../../store/componentsReducer";
import EditCanvas from "./EditCanvas";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";

import style from "./index.module.scss";

const Edit: FC = () => {
  const dispatch = useDispatch();
  // 使用自定义hooks抽取公共部分 (获取请求数据)
  const { loading, error } = useLoadQuestionData();
  const { title } = useGetPageInfo();
  // 修改网页title
  useTitle(`编辑问卷-${title}`);
  //清除被选中组件 id
  const clearSelectedId = () => {
    dispatch(changeSelectedId(""));
  };
  return (
    <div className={style.container}>
      <EditHeader />
      <div className={style["container-wrapper"]}>
        <div className={style.content}>
          <div className={style.left}>
            <div style={{ overflow: "auto", height: "calc(100vh - 90px)" }}>
              <LeftPanel />
            </div>
          </div>
          <div className={style.main} onClick={clearSelectedId}>
            <div className={style["canvas-wrapper"]}>{loading ? <Spin style={{ width: "100%", textAlign: "center", marginTop: "24px" }}></Spin> : <EditCanvas></EditCanvas>}</div>
          </div>
          <div className={style.right}>
            <div style={{ overflow: "auto", height: "calc(100vh - 90px)" }}>
              <RightPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Edit;
