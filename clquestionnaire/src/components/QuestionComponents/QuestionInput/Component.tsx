import React, { FC } from "react";
import { Input, Typography } from "antd";

const { Paragraph } = Typography;

export type QuestionInputType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionInputType) => void;
};

export const QuestionInput: FC<QuestionInputType> = (props) => {
  const { title = "单行输入标题", placeholder = "请输入..." } = props;

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
};

export default QuestionInput;
