import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined, CopyOutlined, BlockOutlined, UpOutlined, DownOutlined, UndoOutlined, RedoOutlined } from "@ant-design/icons";
import { deleteComponent, toggleComponentHide, toggleComponentLocked, copyComponent, pasteComponent, moveUpdateComponent } from "../../../../store/componentsReducer";
// 引入撤销重做的方法
import { ActionCreators } from "redux-undo";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo();
  let { isLocked } = selectedComponent || {};
  //删除选中的组件方法
  const handleDelete = () => {
    dispatch(deleteComponent());
  };
  // 隐藏选中组件方法
  const handleHide = () => {
    dispatch(toggleComponentHide({ fe_id: selectedId, isHide: true }));
  };
  // 锁定/解锁选中组件方法
  const handleLocked = () => {
    dispatch(toggleComponentLocked(selectedId));
  };
  // 复制选中组件
  const handleCopy = () => {
    dispatch(copyComponent());
  };
  const handlePaste = () => {
    dispatch(pasteComponent());
  };
  // 上移和下移的回调
  const handleMove = (type: "up" | "down") => {
    if (selectedId) dispatch(moveUpdateComponent(type));
  };
  // 后退
  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };
  // 前进
  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };
  return (
    <div>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" disabled={!selectedId} icon={<DeleteOutlined />} onClick={handleDelete}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" disabled={!selectedId} icon={<EyeInvisibleOutlined />} onClick={handleHide}></Button>
        </Tooltip>
        <Tooltip title="锁定/解锁">
          <Button shape="circle" disabled={!selectedId} type={isLocked ? "primary" : "default"} icon={<LockOutlined />} onClick={handleLocked}></Button>
        </Tooltip>
        <Tooltip title="复制">
          <Button shape="circle" disabled={!selectedId} icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </Tooltip>
        <Tooltip title="粘贴">
          <Button shape="circle" disabled={!copiedComponent} icon={<BlockOutlined />} onClick={handlePaste}></Button>
        </Tooltip>
        <Tooltip title="上移">
          <Button shape="circle" disabled={!selectedId} icon={<UpOutlined />} onClick={() => handleMove("up")}></Button>
        </Tooltip>
        <Tooltip title="下移">
          <Button shape="circle" disabled={!selectedId} icon={<DownOutlined />} onClick={() => handleMove("down")}></Button>
        </Tooltip>
        <Tooltip title="后退">
          <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo}></Button>
        </Tooltip>
        <Tooltip title="前进">
          <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo}></Button>
        </Tooltip>
      </Space>
    </div>
  );
};

export default EditToolbar;
