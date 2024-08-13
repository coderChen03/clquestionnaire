import React, { FC, useEffect, useRef, useState } from "react";
// component 组件
import QuestionCard from "../../../components/QuestionCard";
import SerachInput from "../../../components/SerachInput";
// 第三方hooks
import { useDebounceFn, useTitle, useRequest } from "ahooks";
// api
import { getQuestionList } from "../../../services/question";
import { useSearchParams } from "react-router-dom";
// 引入常量
import { SERACH_INPUT_KEY, PAGE_SIZE_COUNT_KEY } from "../../../constant";

import style from "./index.module.scss";
import { Empty, Spin, Typography } from "antd";

const { Title } = Typography;
/**这里用到了滚动加载 思路总结
 * 1.需要去监听滚动事件
 * 2.对事件执行进行分析处理，判断是否满足执行要求（element加载元素出现在可视区域）
 * 3.进行数据请求 使用 useRequest
 * 4.完成数据追加
 * 5.填写更新依赖（searchParams变化时） */
const List: FC = () => {
  useTitle("alei问卷-我的问卷");
  //加载更多 ref
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  //问卷列表信息
  const [questionList, setQuestionList] = useState([]);
  const [page, setPage] = useState(1); //list 页面内部 page值
  const [total, setTotal] = useState(0); //总数
  // 请求问卷信息
  const { run: updateList, loading } = useRequest(
    async () => {
      const keyword = searchParams.get(SERACH_INPUT_KEY) || "";
      const res = await getQuestionList({ keyword, page: page.toString(), pageSize: PAGE_SIZE_COUNT_KEY.toString() });
      return res;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list = [], total = 0 } = result;
        setPage(page + 1);
        setQuestionList(questionList.concat(list));
        setTotal(total);
        console.log(result, "result");
      },
    }
  );

  // useDebounceFn from ahooks 防抖函数
  const { run: loadMore } = useDebounceFn(
    () => {
      //判断是否需要执行防抖函数
      if (page > 1 && total <= questionList.length) return;
      const elem = loadMoreRef.current;
      if (elem === null) return;
      // Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置
      const { bottom } = elem.getBoundingClientRect();
      if (!bottom) return;
      // elem 元素出现在可视区域 满足加载更多条件
      if (bottom <= document.body.clientHeight) {
        updateList();
      }
    },
    { wait: 300 }
  );
  // 第一次初始化调用
  useEffect(() => {
    // 重新赋值
    setPage(1);
    setQuestionList([]);
    setTotal(0);
    loadMore();
  }, [searchParams]);
  //监听滚动事件
  useEffect(() => {
    window.addEventListener("scroll", loadMore); //添加滚动事件
    return () => {
      window.removeEventListener("scroll", loadMore); //组件销毁时解绑事件
    };
  }, [searchParams]);

  return (
    <>
      <div className={style.header}>
        <div className={style.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={style.right}>
          <SerachInput />
        </div>
      </div>
      {/* 渲染数据 */}
      <div className={style.content}>
        {questionList.map((item: any) => {
          return <QuestionCard key={item._id} {...item}></QuestionCard>;
        })}
      </div>
      {/* 采用加载更多的方式 */}
      <div className={style.footer}>
        <div ref={loadMoreRef}>
          {/* 预存了一个bug，当将10个数据一个一个删除掉（是滚动条消失），并不会触发加载给多数据 */}
          {loading && (
            <div className={style.loading}>
              <Spin tip="Loading...">
                <div style={{ padding: 50, background: "rgba(0, 0, 0, 0.05)", borderRadius: 4 }} />
              </Spin>
            </div>
          )}
          {page > 1 && total <= questionList.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          {page > 1 && total <= questionList.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有数据可显示" />}
        </div>
      </div>
    </>
  );
};

export default List;
