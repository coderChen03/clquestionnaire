import React, { FC } from "react";
import { Input, Typography } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

export type QuestionTextAreaType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionTextAreaType) => void;
};

export const QuestionTextArea: FC<QuestionTextAreaType> = (props) => {
  const { title = "多行输入标题", placeholder = "请输入..." } = props;

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};

export default QuestionTextArea;
