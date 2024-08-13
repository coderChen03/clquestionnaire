import { FC, useEffect, useState } from "react";

import style from "./index.module.scss";

type QuestionCheckboxType = {
  fe_id: string;
  props: {
    title: string;
    isVertical: boolean;
    lists: { value: string; label: string; checked: boolean }[];
  };
};

const QuestionCheckbox: FC<QuestionCheckboxType> = ({ fe_id, props }) => {
  const { title, isVertical = false, lists = [] } = props;
  // 控制多选框中被勾选的值
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  // 切换多选框的选中
  const toggleChecked = (value: string) => {
    // 判断 selectedValues是否已经保存了value 保存则取消勾选
    if (selectedValues.includes(value)) {
      setSelectedValues((selectedValues) => selectedValues.filter((v) => v !== value));
    } else {
      //勾选
      setSelectedValues(selectedValues.concat(value));
    }
  };

  //初始化勾选框
  useEffect(() => {
    let selectedList: string[] = [];
    lists.forEach((item) => {
      const { checked, value } = item;
      if (checked) {
        selectedList.push(value);
      }
    });
    setSelectedValues(selectedList);
  }, [lists]);
  return (
    <>
      <input type="hidden" name={fe_id} value={selectedValues.toString()} />
      <p>{title}</p>
      <ul className={style.list}>
        {lists.map((item) => {
          const { value, label } = item;
          return (
            <li key={value} className={isVertical ? style.verticalItem : style.horizontalItem}>
              <label>
                {/*
                 *后端需要的数据类型是 key(fe_id)：value
                 *需要操作一个可维护的数组来确定被勾选的值，并使用隐藏域的方式去按后端设定的类型传值
                 */}
                <input type="checkbox" checked={selectedValues.includes(value)} onChange={() => toggleChecked(value)} />
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionCheckbox;
