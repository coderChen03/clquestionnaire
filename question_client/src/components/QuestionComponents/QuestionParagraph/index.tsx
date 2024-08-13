import { FC, CSSProperties } from "react";

type QuestionParagraphType = {
  props: { text: string; isCenter: boolean };
};

const QuestionParagraph: FC<QuestionParagraphType> = ({ props }) => {
  const { text = "", isCenter = false } = props;
  const style: CSSProperties = {};
  if (isCenter) style.textAlign = "center";
  let strArr = text.split("\n");
  return (
    <p style={style}>
      {strArr.map((str, index) => {
        return (
          <span key={index}>
            {index !== 0 && <br />}
            {str}
          </span>
        );
      })}
    </p>
  );
};

export default QuestionParagraph;
