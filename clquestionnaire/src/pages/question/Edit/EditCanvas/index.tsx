import React, { FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import className from "classnames";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { getComponentByType } from "../../../../components/QuestionComponents";
import { ComponentType, changeSelectedId, dargUpdateComponent } from "../../../../store/componentsReducer";
import useBingCanvasKeyPress from "../../../../hooks/useBingCanvasKeypress";
import SortableContainer from "../../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../../components/DragSortable/SortableItem";
import style from "./index.module.scss";

const EditCanvas: FC = () => {
  const dispatch = useDispatch();
  //监听toolbar工具栏快捷键事件
  useBingCanvasKeyPress();
  //获取组件信息 向后端获取
  const { componentList, selectedId } = useGetComponentInfo();
  // 通过组件 type动态生成组件方法
  const renderComponent = (componentInfo: ComponentType) => {
    const { props, type } = componentInfo;
    let config = getComponentByType(type);
    if (config) {
      const { Component } = config;
      return <Component {...props} />;
    }
    return null;
  };
  //点击选中回调 切换相应的 id来配置不同的组件
  const clickSelected = (e: MouseEvent, id: string) => {
    e.stopPropagation(); //阻止冒泡
    //更新 store selectedId
    dispatch(changeSelectedId(id));
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
      <div className={style.canvas}>
        {componentList
          .filter((com) => !com.isHide)
          .map((com) => {
            //被选中的样式
            let selectStyle = style.selectedComponent;
            let lockedStyle = style.lockedComponent;
            //处理外层盒子的 class
            const classes = className(style["component-wrapper"], {
              [selectStyle]: selectedId === com.fe_id,
              [lockedStyle]: com.isLocked,
            });
            return (
              <SortableItem key={com.fe_id} id={com.fe_id}>
                <div className={classes} onClick={(e) => clickSelected(e, com.fe_id)}>
                  <div className={style.component}>{renderComponent(com)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
