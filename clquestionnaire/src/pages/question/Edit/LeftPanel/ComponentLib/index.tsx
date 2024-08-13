import React, { FC } from "react";
import { Typography } from "antd";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { ComponentListGroup, ComponentsConfigType } from "../../../../../components/QuestionComponents";
import { addComponent } from "../../../../../store/componentsReducer";
import style from "./index.module.scss";

const { Title } = Typography;

const ComponentLib: FC = () => {
  const dispatch = useDispatch();
  // 渲染组件
  const renderComponent = (component: ComponentsConfigType) => {
    const { Component } = component;
    return <Component />;
  };
  //点击组件库添加组件到画布的方法
  const handleAddCanvas = (component: ComponentsConfigType) => {
    const { title, type } = component;
    dispatch(
      addComponent({
        fe_id: nanoid(),
        type,
        title,
        props: {}, //在每个组件内部中定义了默认值,没有将默认值提起出来作为模块,所以传入空 {} 算使用默认值
      })
    );
  };
  return (
    <div>
      {ComponentListGroup.map((group) => {
        const { groupType, groupName, components } = group;
        return (
          <div key={groupType}>
            <Title level={5}>{groupName}</Title>
            <div>
              {components.map((component) => {
                return (
                  <div className={style.wrapper} key={component.type} onClick={() => handleAddCanvas(component)}>
                    <div className={style.component}>{renderComponent(component)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ComponentLib;
