import React, { FC, useState } from "react";
import { EditOutlined, LineChartOutlined, StarOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import { Space, Button, Divider, Tag, Popconfirm, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import type { PopconfirmProps } from "antd";
import { updateQuestion, duplicateQuestion } from "../../services/question";
import { useRequest } from "ahooks";

// 问卷卡片类型
type QuestionCardProps = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
  isDelete: boolean;
};

const QuestionCard: FC<QuestionCardProps> = (props) => {
  const { _id, title, isStar, isPublished, answerCount, createdAt, isDelete } = props;
  const nav = useNavigate();
  // 控制标星状态
  const [starState, setStarState] = useState(isStar);
  // 控制删除状态
  const [deleteState, setDeleteState] = useState(isDelete);
  // 更新 标星问卷
  let { run: changeStar, loading: loadingStar } = useRequest(
    async () => {
      let res = await updateQuestion(_id, { isStar });
      return res;
    },
    {
      manual: true,
      onSuccess() {
        setStarState(!isStar);
        message.success("更新成功");
      },
    }
  );
  // 复制问卷
  let { run: handleDuplicate, loading: loadingDuplicate } = useRequest(async () => await duplicateQuestion(_id), {
    manual: true, //手动执行
    onSuccess(result) {
      message.success("复制成功,自动跳转到编辑页");
      setTimeout(() => {
        nav(`/question/edit/${result.id}`);
      }, 1000);
    },
  });
  let { run: handleDelete, loading: loadingDelete } = useRequest(async () => await updateQuestion(_id, { isDelete }), {
    manual: true,
    onSuccess(result) {
      setDeleteState(!deleteState);
      message.success("删除成功,可前往回收站回复");
    },
  });
  // 删除问卷的再次确认气泡框
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    handleDelete();
  };
  return (
    <>
      {!deleteState && (
        <div className={style.container}>
          <div className={style.title}>
            <div className={style.left}>
              <Link to={isPublished ? `/question/statist/${_id}` : `/question/edit/${_id}`}></Link>
              <Space>
                {starState && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </div>
            <div className={style.right}>
              <Space>
                {isPublished ? <Tag color="green">已发布</Tag> : <Tag color="red">未发布</Tag>}
                <span>收到回复: {answerCount}</span>
                <span>创建时间: {createdAt}</span>
              </Space>
            </div>
          </div>
          <Divider />
          <div className={style["button-container"]}>
            <div className={style.left}>
              <Space>
                <Button type="text" size="small" icon={<EditOutlined />} onClick={() => nav(`/question/edit/${_id}`)}>
                  编辑问卷
                </Button>
                <Button type="text" size="small" disabled={!isPublished} icon={<LineChartOutlined />} onClick={() => nav(`/question/statist/${_id}`)}>
                  问卷统计
                </Button>
              </Space>
            </div>
            <div className={style.right}>
              <Space>
                <Button type="text" size="small" icon={<StarOutlined />} onClick={changeStar} disabled={loadingStar}>
                  {starState ? "取消标星" : "标星"}
                </Button>
                <Button type="text" size="small" icon={<CopyOutlined />} onClick={handleDuplicate} disabled={loadingDuplicate}>
                  复制
                </Button>
                <Popconfirm title="删除问卷" description="你确定删除这个问卷吗?" onConfirm={confirm} okText="删除" cancelText="取消">
                  <Button type="text" size="small" icon={<DeleteOutlined />} disabled={loadingDelete}>
                    删除
                  </Button>
                </Popconfirm>
              </Space>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionCard;
