import { FC } from "react";
import { Radio, Space, Typography } from "antd";

const { Paragraph } = Typography;

export type optionType = {
  value: string;
  label: string;
};

export type QuestionRadioType = {
  title?: string;
  options?: optionType[];
  value?: string;
  isVertical?: boolean; //是否垂直展示

  disabled?: boolean;
  onChange?: (newProps: QuestionRadioType) => void;
};

const QuestionRadio: FC<QuestionRadioType> = (props) => {
  const {
    title = "单选标题",
    options = [
      { value: "item1", label: "选项1" },
      { value: "item2", label: "选项2" },
      { value: "item3", label: "选项3" },
    ],
    isVertical = false,
    value = "",
  } = props;

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Radio.Group value={value}>
          <Space direction={isVertical ? "vertical" : "horizontal"}>
            {options.map((item) => {
              return (
                <Radio key={item.value} value={item.value}>
                  {item.label}
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default QuestionRadio;
