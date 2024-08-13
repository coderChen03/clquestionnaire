import React, { FC, useEffect } from "react";
import { Checkbox, Form, Input, Select } from "antd";
import { QuestionTitleType } from "./Component";

const PropComponent: FC<QuestionTitleType> = (props: QuestionTitleType) => {
  const { text = "一级标题", level = 1, isCenter = false, disabled, onChange } = props;
  const [form] = Form.useForm();
  //监听变化，及时修改值
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);
  // 处理内容改变回调
  const handleChange = () => {
    if (onChange) onChange(form.getFieldsValue());
  };
  return (
    <Form disabled={disabled} onValuesChange={handleChange} layout="vertical" initialValues={{ text, level, isCenter }} form={form}>
      <Form.Item label="标题内容" name="text" rules={[{ required: true, message: "请输入标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
