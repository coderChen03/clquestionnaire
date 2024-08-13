import React, { FC, useState } from "react";
// component组件
import SerachInput from "../../../components/SerachInput";
import ListPagination from "../../../components/ListPagination";
// 第三方 hooks
import { useRequest, useTitle } from "ahooks";
//自定义 hooks
import useSerachQuestionList from "../../../hooks/useSerachQuestionList";
//api
import { updateQuestion, deleteQuestion } from "../../../services/question";

import style from "./index.module.scss";
import { Typography, Empty, Table, Tag, Space, Button, Modal, Spin, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Trash: FC = () => {
  useTitle("alei问卷-回收站");
  // 回收站问卷列表信息
  const { data = {}, loading, refresh } = useSerachQuestionList({ isDelete: true });
  const { list = [], total = 0 } = data;
  // 第一行头列表
  const columns = [
    {
      title: "问卷标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="green">已发布</Tag> : <Tag color="red">未发布</Tag>;
      },
    },
    {
      title: "是否标星",
      dataIndex: "isStar",
      render: (isStar: boolean) => {
        return isStar ? <Tag color="red">已标星</Tag> : <Tag color="default">未标星</Tag>;
      },
    },
    {
      title: "回复人数",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];
  // 被选中行的 _id 数组
  const [selectRow, setSelectRow] = useState<string[]>([]);
  // 恢复问卷
  const { run: recoverQuestion, loading: loadingRecover } = useRequest(
    async () => {
      // 循序发送请求所有的id
      for await (const id of selectRow) {
        await updateQuestion(id, { isDelete: false });
      }
    },
    {
      manual: true,
      onSuccess(result) {
        message.success("恢复成功,可前往我的问卷查看");
        // 重新刷新一次数据
        refresh();
        //清空被选中的id
        setSelectRow([]);
      },
    }
  );
  // 彻底删除问卷
  const { run: handleDelete, loading: loadingDelete } = useRequest(async () => await deleteQuestion(selectRow), {
    manual: true,
    onSuccess(result) {
      message.success("删除成功");
      // 采用重新请求的方式刷新数据
      refresh();
      //清空被选中的id
      setSelectRow([]);
    },
  });

  // 控制删除提示模态框的显示与隐藏
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 显示删除模态框
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 删除提示模态框点击 OK的回调
  const handleOk = () => {
    handleDelete();
    setIsModalOpen(false);
  };
  // 删除提示模态框点击 cancel的回调
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={style.header}>
        <div className={style.left}>
          <Title level={3}>回收站</Title>
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
          {list.length > 0 && (
            <>
              <div style={{ marginBottom: "16px" }}>
                <Space>
                  <Button type="primary" disabled={selectRow.length === 0 || loadingRecover} onClick={recoverQuestion}>
                    恢复
                  </Button>
                  <Button danger disabled={selectRow.length === 0 || loadingDelete} onClick={showModal}>
                    彻底删除
                  </Button>
                </Space>
              </div>
              <Table
                rowSelection={{
                  type: "checkbox",
                  onChange: (selectedRowKeys) => {
                    setSelectRow(selectedRowKeys as string[]);
                  },
                }}
                columns={columns}
                dataSource={list}
                pagination={false}
                rowKey={(item) => item._id}
              />
            </>
          )}
        </div>
      )}
      <div className={style.footer}>
        <ListPagination total={total} />
      </div>
      {/* 确定彻底删除问卷模态框 */}
      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: "red" }} />
            确定彻底删除以下问卷?(不可逆转的操作)
          </Space>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={false}
      >
        <Space direction="vertical">
          {list.map((item: any, index: number) => {
            if (selectRow.includes(item._id))
              return (
                <p key={item._id}>
                  {index + 1} . {item.title}
                </p>
              );
          })}
        </Space>
      </Modal>
    </>
  );
};
export default Trash;
