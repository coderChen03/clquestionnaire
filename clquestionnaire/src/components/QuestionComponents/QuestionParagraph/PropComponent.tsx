import React, { FC, useEffect } from "react";
import { Checkbox, Form, Input } from "antd";
import { QuestionParagraphType } from "./Component";

const { TextArea } = Input;

const PropComponent: FC<QuestionParagraphType> = (props) => {
  const { text = "这是一个段落", isCenter = false, disabled, onChange } = props;
  const [form] = Form.useForm();
  //监听变化，及时修改值
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);
  // 处理内容改变回调
  const handleChange = () => {
    if (onChange) onChange(form.getFieldsValue());
    console.log(text, "text");
  };
  return (
    <Form disabled={disabled} onValuesChange={handleChange} layout="vertical" initialValues={{ text, isCenter }} form={form}>
      <Form.Item label="段落内容" name="text" rules={[{ required: true, message: "请输入段落" }]}>
        <TextArea />
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
