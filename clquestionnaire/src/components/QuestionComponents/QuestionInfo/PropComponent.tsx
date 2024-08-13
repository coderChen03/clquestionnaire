import { FC, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { QuestionInfoType } from "./Component";

const { TextArea } = Input;

const PropComponent: FC<QuestionInfoType> = (props) => {
  const { title = "问卷标题", desc = "问卷描述...", level = 1, disabled, onChange } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc, level });
  }, [title, desc, level]);

  const handleValuesChange = (values: QuestionInfoType) => {
    if (onChange) onChange(form.getFieldsValue());
  };
  return (
    <Form disabled={disabled} onValuesChange={handleValuesChange} layout="vertical" initialValues={{ title, desc, level }} form={form}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="标题层级" name="level">
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
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
