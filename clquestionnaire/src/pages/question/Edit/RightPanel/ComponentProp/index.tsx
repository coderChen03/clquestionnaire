import React, { FC } from "react";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../../../hooks/useGetComponentInfo";
import { getComponentByType, ComponentsPropsType } from "../../../../../components/QuestionComponents";
import { updateComponent } from "../../../../../store/componentsReducer";

const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  // 属性面板值更新的回调
  const handleChange = (newProps: ComponentsPropsType) => {
    if (!selectedComponent) return;
    const { fe_id } = selectedComponent;
    //在store中更新数据
    dispatch(updateComponent({ fe_id, newProps }));
  };
  // 渲染属性面板
  const renderComponent = () => {
    if (selectedComponent) {
      const { type, props, isLocked} = selectedComponent;
      const config = getComponentByType(type);
      if (config) {
        const { PropComponent } = config;
        return <PropComponent {...props} disabled={isLocked} onChange={handleChange} />;
      }
    }
    return <div style={{ textAlign: "center" }}>未选择组件</div>;
  };

  return <div>{renderComponent()}</div>;
};
export default ComponentProp;
