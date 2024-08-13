import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Space, Typography, InputRef, message } from "antd";
import { LeftOutlined, EditOutlined } from "@ant-design/icons";
import { useRequest, useDebounceEffect, useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import EditToolbar from "../EditToolbar";
import useGetPageInfo from "../../../../hooks/useGetPageInfo";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { changePageTitle } from "../../../../store/pageInfoReducer";
//api
import { updateQuestion } from "../../../../services/question";

import style from "./index.module.scss";

const { Title } = Typography;

const EditHeader: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // 获取问卷页面信息
  const pageInfo = useGetPageInfo();
  const { title } = pageInfo;
  // 问卷页面组件列表信息
  const { componentList } = useGetComponentInfo();
  // 从url上获取当前问卷的id
  const { id } = useParams();
  //控制页面标题是文本类型还是input（可输入）类型
  const [titleType, setTitleType] = useState(false);
  // ref
  const inputRef = useRef<InputRef>(null);
  // 监听自动获取焦点
  useEffect(() => {
    if (titleType) inputRef.current?.focus();
  }, [titleType]);
  //处理修改页面title（name）的回调
  const handleUpdateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //更新到pageInfo store中
    let newTitle = e.target.value.trim();
    if (newTitle) dispatch(changePageTitle(newTitle));
  };
  //保存问卷信息处理函数
  const { run: saveQuestion, loading: loadingSave } = useRequest(
    async () => {
      if (!id) return;
      return await updateQuestion(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
      onSuccess() {
        message.success("保存成功");
      },
    }
  );
  // 自动保存 监听 componentList 数据的变化
  /**注意: react useEffect对依赖项浅拷贝问题*/
  useDebounceEffect(
    () => {
      saveQuestion();
    },
    [componentList, pageInfo],
    { wait: 1000 * 10 }
  );
  //保存的快捷键
  useKeyPress(["ctrl.s", "meta.s"], (e: KeyboardEvent) => {
    e.preventDefault();
    if (!loadingSave) saveQuestion();
  });
  // 发布问卷信息的处理函数
  const { run: publishQuestion, loading: loadingPublish } = useRequest(
    async () => {
      if (!id) return; //isPublished:标记问卷已经发布
      return await updateQuestion(id, { ...pageInfo, componentList, isPublished: true });
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功！");
        nav(`/question/statist/${id}`);
      },
    }
  );
  return (
    <div className={style["header-wrapper"]}>
      <div className={style.header}>
        <div className={style.left}>
          <Space>
            {/* nav(-1) 返回一层 nav(1) 前进一层*/}
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            {titleType ? <Input ref={inputRef} value={title} onChange={handleUpdateTitle} onPressEnter={() => setTitleType(false)} onBlur={() => setTitleType(false)} /> : <Title>{title}</Title>}
            <Button icon={<EditOutlined />} type="text" onClick={() => setTitleType(!titleType)} />
          </Space>
        </div>
        <div className={style.main}>
          <EditToolbar />
        </div>
        <div className={style.right}>
          <Space>
            <Button onClick={saveQuestion} disabled={loadingSave}>
              保存
            </Button>
            <Button type="primary" onClick={publishQuestion} disabled={loadingPublish}>
              发布
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
