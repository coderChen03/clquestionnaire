import React, { FC, useEffect } from "react";
import { Button, Checkbox, Form, Input, Select, Space, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
import { QuestionCheckboxType, optionType } from "./Component";

const PropComponent: FC<QuestionCheckboxType> = (props: QuestionCheckboxType) => {
  const {
    title = "多选标题",
    lists = [
      { value: "item1", label: "多选1", checked: false },
      { value: "item2", label: "多选2", checked: false },
      { value: "item3", label: "多选3", checked: false },
    ], //默认选项
    isVertical = false,
    disabled,
    onChange,
  } = props;
  const [form] = Form.useForm();
  //监听变化，及时修改值
  useEffect(() => {
    form.setFieldsValue({ title, lists, isVertical });
  }, [title, lists, isVertical]);
  // 处理内容改变回调
  const handleChange = () => {
    if (onChange) onChange(form.getFieldsValue());
  };
  return (
    <Form disabled={disabled} onValuesChange={handleChange} layout="vertical" initialValues={{ title, lists, isVertical }} form={form}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题内容" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        {/*使用 Form.List 动态增减表单项 */}
        <Form.List name="lists">
          {(fields, { add, remove }) => {
            return (
              <>
                {/* 遍历所有选项 */}
                {fields.map((field, index) => {
                  const { key, name } = field;
                  return (
                    <Space key={key} align="baseline">
                      {/* 默认选中 */}
                      <Form.Item name={[name, "checked"]} valuePropName="checked">
                        <Checkbox></Checkbox>
                      </Form.Item>
                      {/* 选项输入 */}
                      <Form.Item
                        name={[name, "label"]}
                        rules={[
                          { required: true, message: "选项内容不能为空" },
                          // 判断用户是否输入了相同的选项
                          {
                            validator(_, label) {
                              let count = 0;
                              lists.forEach((item) => {
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
                          if (lists.length <= 1) return message.warning("无法删除最后一个选项！");
                          remove(name);
                        }}
                      />
                    </Space>
                  );
                })}
                {/* 添加选项 */}
                <Button style={{ border: "1px dashed #1677ff" }} type="link" onClick={() => add({ value: nanoid(5), label: `多选${lists.length+1}`, checked: false })} icon={<PlusOutlined />} block>
                  添加选项
                </Button>
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
