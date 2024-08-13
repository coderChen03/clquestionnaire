import { FC } from "react";
import style from "./index.module.scss";

export type QuestionInputType = {
  fe_id: string;
  props: {
    title: string;
    placeholder: string;
  };
};

const QuestionInput: FC<QuestionInputType> = ({ fe_id, props }) => {
  const { title = "", placeholder = "" } = props;
  return (
    <>
      <p>{title}</p>
      <div className={style.inputWrapper}>
        <input name={fe_id} type="text" placeholder={placeholder} />
      </div>
    </>
  );
};

export default QuestionInput;
