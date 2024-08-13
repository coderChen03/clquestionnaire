import React, { FC } from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export type QuestionInfoType = {
  desc?: string;
  title?: string;
  level?: 1 | 2 | 3 | 4 | 5;

  disabled?: boolean;
  onChange?: (newProps: QuestionInfoType) => void;
};

const QuestionInfo: FC<QuestionInfoType> = (props) => {
  const { title = "问卷标题", desc = "问卷描述...", level = 1 } = props;
  return (
    <div style={{ textAlign: "center" }}>
      <Title level={level}>{title}</Title>
      <Paragraph style={{ marginBottom: 0 }}>
        {desc.split("\n").map((t, index) => {
          return (
            <span key={index}>
              {index !== 0 && <br />} {t}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
