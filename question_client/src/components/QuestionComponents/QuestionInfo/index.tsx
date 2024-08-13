import { FC } from "react";

type QuestionInfoType = {
  props: { title: string; desc: string };
};

const QuestionInfo: FC<QuestionInfoType> = ({ props }) => {
  const { title = "", desc = "" } = props;
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
};
export default QuestionInfo;
