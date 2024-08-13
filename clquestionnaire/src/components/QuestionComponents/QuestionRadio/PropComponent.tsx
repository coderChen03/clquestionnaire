import React, { FC, useEffect } from "react";
import { Button, Checkbox, Form, Input, Radio, Select, Space, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
import { QuestionRadioType } from "./Component";

const PropComponent: FC<QuestionRadioType> = (props: QuestionRadioType) => {
  const {
    title = "单选标题",
    options = [
      { value: "item1", label: "选项1" },
      { value: "item2", label: "选项2" },
      { value: "item3", label: "选项3" },
    ], //默认选项
    isVertical = false,
    value = "", //默认值
    disabled,
    onChange,
  } = props;
  const [form] = Form.useForm();
  //监听变化，及时修改值
  useEffect(() => {
    form.setFieldsValue({ title, options, isVertical, value });
  }, [title, options, isVertical, value]);
  // 处理内容改变回调
  const handleChange = () => {
    if (onChange) onChange(form.getFieldsValue());
  };
  return (
    <Form disabled={disabled} onValuesChange={handleChange} layout="vertical" initialValues={{ title, options, isVertical, value }} form={form}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题内容" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        {/*使用 Form.List 动态增减表单项 */}
        <Form.List name="options">
          {(fields, { add, remove }) => {
            return (
              <>
                {/* 遍历所有选项 */}
                {fields.map((field, index) => {
                  const { key, name } = field;
                  return (
                    <Space key={key} align="baseline">
                      <Form.Item
                        name={[name, "label"]}
                        rules={[
                          { required: true, message: "选项内容不能为空" },
                          // 判断用户是否输入了相同的选项
                          {
                            validator(_, label) {
                              let count = 0;
                              options.forEach((item) => {
                                if (item.label === label) count++;
                              });
                              if (count === 1) return Promise.resolve();
                              return Promise.reject(new Error("选项内容相同"));
                            },
                          },
                        ]}
                      >
                        <Input placeholder="请输入选项内容" />
                      </Form.Item>
                      {/* 删除按钮 */}
                      <MinusCircleOutlined
                        onClick={() => {
                          // 判断是否为最后一个
                          if (options.length <= 1) return message.warning("无法删除最后一个选项！");
                          remove(name);
                        }}
                      />
                    </Space>
                  );
                })}
                {/* 添加选项 */}
                <Button style={{ border: "1px dashed #1677ff" }} type="link" onClick={() => add({ value: nanoid(), label: `单选${options.length + 1}` })} icon={<PlusOutlined />} block>
                  添加选项
                </Button>
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选项" name="value">
        <Select options={options} />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
