import { FC } from "react";
import style from "./index.module.scss";

export type QuestionRadioType = {
  fe_id: string;
  props: {
    title: string;
    isVertical: boolean;
    options: { value: string; label: string }[];
    value: string;
  };
};

const QuestionRadio: FC<QuestionRadioType> = ({ fe_id, props }) => {
  const { title = "", isVertical = false, options = [], value = "" } = props;
  return (
    <>
      <p>{title}</p>
      <ul className={style.list}>
        {options.map((item) => {
          const { label } = item;
          return (
            <li key={item.value} className={isVertical ? style.verticalItem : style.horizontalItem}>
              <label>
                <input type="radio" name={fe_id} value={item.value} defaultChecked={item.value === value} />
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionRadio;
