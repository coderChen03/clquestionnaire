import { FC } from "react";
import style from "./index.module.scss";

type QuestionTextAreaType = {
  fe_id: string;
  props: { title: string; placeholder: string };
};
const QuestionTextArea: FC<QuestionTextAreaType> = ({ fe_id, props }) => {
  const { title, placeholder } = props;
  return (
    <>
      <p>{title}</p>
      <div className={style.textareaWrapper}>
        <textarea name={fe_id} placeholder={placeholder} rows={3} />
      </div>
    </>
  );
};
export default QuestionTextArea;
