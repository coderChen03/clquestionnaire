import { ChangeEvent, FC, useRef, useState } from "react";
import { Button, Input, message, InputRef, Space, Tooltip } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../../../hooks/useGetComponentInfo";
import { changeSelectedId, updateComponentTitle, toggleComponentHide, toggleComponentLocked, dargUpdateComponent } from "../../../../../store/componentsReducer";
import SortableContainer from "../../../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../../../components/DragSortable/SortableItem";

import style from "./index.module.scss";

const Layers: FC = () => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();
  // 保存当前选中的id 用于文本和输入框的切换
  const [curSelectId, setCurSelectId] = useState("");
  // ref 用于input自动获取焦点
  const inputRef = useRef<InputRef>(null);
  // 处理点击title的回调 (当点击的fe_id和selectedId不一样说明是切换选中，一样则是修改标题)
  const handleTitleClick = (fe_id: string) => {
    // 逻辑需求:不能选中被隐藏的组件图层
    let curComp = componentList.find((comp) => comp.fe_id === fe_id);
    if (curComp && curComp?.isHide) return message.info("不能选中被隐藏的图层");
    if (fe_id !== selectedId) {
      //执行切换选中 去store中修改 selectedId
      dispatch(changeSelectedId(fe_id));
      setCurSelectId("");
      return;
    }
    if (fe_id === selectedId) {
      //需要执行修改标题 将文本框变成输入框
      setCurSelectId(fe_id);
      //自动获取焦点
      setTimeout(() => {
        inputRef.current?.focus();
      });
    }
  };
  // 处理修改title输入框值改变的回调
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newTitle = e.target.value.trim();
    if (!newTitle || !curSelectId) return;
    dispatch(updateComponentTitle({ fe_id: curSelectId, title: newTitle }));
  };
  // 处理切换隐藏的回调
  const handleToggleHidden = (fe_id: string, isHide: boolean) => {
    if (fe_id) dispatch(toggleComponentHide({ fe_id, isHide }));
  };
  //切换锁定的回调
  const handleToggleLocked = (fe_id: string) => {
    if (fe_id) dispatch(toggleComponentLocked(fe_id));
  };
  //给组件列表添加一个拖拽组件需要的 id--方法
  const addDragId = () => {
    return componentList.map((c) => {
      return { ...c, id: c.fe_id };
    });
  };
  // 拖拽结束后的回调
  const onDragEnd = (oldIndex: number, newIndex: number) => {
    // 调用更新component store
    dispatch(dargUpdateComponent({ oldIndex, newIndex }));
  };
  return (
    <SortableContainer items={addDragId()} onDragEnd={onDragEnd}>
      {componentList.map((comp) => {
        let { fe_id, title, isHide, isLocked } = comp;
        //添加被选中的样式
        let classes = classNames(style.title, {
          [style.selected]: fe_id === selectedId,
        });
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={style.wrapper}>
              <div className={classes} onClick={() => handleTitleClick(fe_id)}>
                {fe_id === curSelectId ? <Input ref={inputRef} value={title} onChange={handleTitleChange} onPressEnter={() => setCurSelectId("")} onBlur={() => setCurSelectId("")} /> : title}
              </div>
              <div className={style.handler}>
                <Space>
                  <Tooltip title={isHide ? "显示" : "隐藏"}>
                    <Button onClick={() => handleToggleHidden(fe_id, !isHide)} className={!isHide ? style.btn : ""} size="small" shape="circle" icon={<EyeInvisibleOutlined />} type={isHide ? "primary" : "text"} />
                  </Tooltip>
                  <Tooltip title={isLocked ? "解锁" : "锁定"}>
                    <Button onClick={() => handleToggleLocked(fe_id)} className={!isLocked ? style.btn : ""} size="small" shape="circle" icon={<LockOutlined />} type={isLocked ? "primary" : "text"} />
                  </Tooltip>
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
