import React, { FC, useEffect } from "react";
import { Form, Input } from "antd";
import { QuestionTextAreaType } from "./Component";

const { TextArea } = Input;

const PropComponent: FC<QuestionTextAreaType> = (props: QuestionTextAreaType) => {
  const { title = "多行输入标题", placeholder = "请输入...", disabled, onChange } = props;
  const [form] = Form.useForm();
  //监听变化，及时修改值
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);
  // 处理内容改变回调
  const handleChange = () => {
    if (onChange) onChange(form.getFieldsValue());
  };
  return (
    <Form disabled={disabled} onValuesChange={handleChange} layout="vertical" initialValues={{ title, placeholder }} form={form}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题内容" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <TextArea />
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
