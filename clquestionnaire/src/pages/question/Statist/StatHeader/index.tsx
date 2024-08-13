import { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Space, Button, Typography, Input, Tooltip, InputRef, message, Popover, QRCode } from "antd";
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../../hooks/useGetPageInfo";

import style from "./index.module.scss";

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  //从url中 获取当前问卷id
  const { id } = useParams();
  const { title } = useGetPageInfo();
  const inputRef = useRef<InputRef>(null);
  //url 拼接 需要参考c端规则
  const url = `http://localhost:3000/question/${id}`;
  // 点击 复制链接 的回调
  const clickCopy = () => {
    //选中输入框的值
    inputRef.current?.select();
    //拷贝所有选中
    document.execCommand("copy");
    message.success("复制成功");
  };

  return (
    <div className={style["header-wrapper"]}>
      <div className={style.header}>
        <div className={style.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={style.main}>
          <Space>
            <Input value={url} ref={inputRef} style={{ width: "300px" }} />
            <Tooltip title="复制链接">
              <Button icon={<CopyOutlined />} onClick={clickCopy}></Button>
            </Tooltip>
            <Popover content={<QRCode value={url} bordered={false} color="pink" />}>
              <Button icon={<QrcodeOutlined />}></Button>
            </Popover>
          </Space>
        </div>
        <div className={style.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑页面
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
