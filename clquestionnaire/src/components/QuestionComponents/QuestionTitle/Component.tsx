import React, { FC } from "react";
import { Typography } from "antd";

const { Title } = Typography;

export type QuestionTitleType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
  disabled?: boolean;
  onChange?: (newProps: QuestionTitleType) => void;
};

export const QuestionTitle: FC<QuestionTitleType> = (props) => {
  const { text = "一级标题", level = 1, isCenter = false } = props;
  return (
    <Title level={level} style={{ textAlign: isCenter ? "center" : "start", marginBottom: 0 }}>
      {text}
    </Title>
  );
};

export default QuestionTitle;
