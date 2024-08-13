import { FC } from "react";
import classNames from "classnames";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { getComponentByType } from "../../../../components/QuestionComponents";
import style from "./index.module.scss";

type ListType = {
  selectedId: string;
  setSelectedId: (id: string) => void;
  setSelectedType: (type: string) => void;
};

const LeftList: FC<ListType> = (props) => {
  const { selectedId, setSelectedId, setSelectedType } = props;
  const { componentList } = useGetComponentInfo();

  return (
    <div className={style.container}>
      {componentList
        .filter((c) => !c.isHide) //这里需要过滤被隐藏的组件
        .map((config) => {
          const { fe_id, type, props } = config;
          // 通过类型获取组件配置信息
          const component = getComponentByType(type);
          if (!component) return null;
          const { Component } = component;
          const classes = classNames(style["component-wrapper"], {
            [style.selected]: selectedId === fe_id,
          });
          return (
            <div
              className={classes}
              key={fe_id}
              onClick={() => {
                setSelectedId(fe_id);
                setSelectedType(type);
              }}
            >
              <div className={style.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LeftList;
