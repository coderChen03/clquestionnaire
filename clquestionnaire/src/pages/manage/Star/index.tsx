import React, { FC } from "react";
// component组件
import QuestionCard from "../../../components/QuestionCard";
import SerachInput from "../../../components/SerachInput";
import ListPagination from "../../../components/ListPagination";
// 第三方 hooks
import { useTitle } from "ahooks";
//自定义 hooks
import useSerachQuestionList from "../../../hooks/useSerachQuestionList";

import style from "./index.module.scss";
import { Typography, Empty, Spin } from "antd";

const { Title } = Typography;

const Star: FC = () => {
  useTitle("alei问卷-星标问卷");
  // 星标问卷列表信息
  const { data = {}, loading } = useSerachQuestionList({ isStar: true });
  const { list = [], total = 0 } = data;
  return (
    <>
      <div className={style.header}>
        <div className={style.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={style.right}>
          <SerachInput />
        </div>
      </div>
      {loading ? (
        <div className={style.loading}>
          <Spin tip="Loading...">
            <div style={{ padding: 50, background: "rgba(0, 0, 0, 0.05)", borderRadius: 4 }} />
          </Spin>
        </div>
      ) : (
        <div className={style.content}>
          {list.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          {list.length > 0 &&
            list.map((item: any) => {
              return <QuestionCard key={item._id} {...item}></QuestionCard>;
            })}
        </div>
      )}

      <div className={style.footer}>
        <ListPagination total={total} />
      </div>
    </>
  );
};
export default Star;
