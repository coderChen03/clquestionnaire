import React, { FC } from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

export type QuestionParagraphType = {
  text?: string;
  isCenter?: boolean;
  disabled?: boolean;
  onChange?: (newProps: QuestionParagraphType) => void;
};

const QuestionParagraph: FC<QuestionParagraphType> = (props) => {
  const { text = "这是一个段落", isCenter = false } = props;
  return (
    <Paragraph style={{ textAlign: isCenter ? "center" : "start", marginBottom: 0 }}>
      {/* 解决 TextArea输入框换行问题  （把字符串text中的\n转换成换行标签<br />）*/}
      {text.split("\n").map((t, index) => {
        return (
          <span key={index}>
            {index !== 0 && <br />}
            {t}
          </span>
        );
      })}
    </Paragraph>
  );
};

export default QuestionParagraph;
