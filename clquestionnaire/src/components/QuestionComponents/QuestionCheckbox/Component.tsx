import { FC } from "react";
import { Space, Typography, Checkbox } from "antd";

const { Paragraph } = Typography;

export type optionType = {
  value: string;
  label: string;
  checked: boolean;
};

export type QuestionCheckboxType = {
  title?: string;
  lists?: optionType[];
  isVertical?: boolean; //是否垂直展示

  disabled?: boolean;
  onChange?: (newProps: QuestionCheckboxType) => void;
};

const QuestionCheckbox: FC<QuestionCheckboxType> = (props) => {
  const {
    title = "多选标题",
    lists = [
      { value: "item1", label: "多选1", checked: false },
      { value: "item2", label: "多选2", checked: false },
      { value: "item3", label: "多选3", checked: false },
    ],
    isVertical = false,
  } = props;

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {lists.map((item) => {
            const { label, checked, value } = item;
            return (
              <Checkbox key={value} value={value} checked={checked}>
                {label}
              </Checkbox>
            );
          })}
        </Space>
      </div>
    </div>
  );
};

export default QuestionCheckbox;
