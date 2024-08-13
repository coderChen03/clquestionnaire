import { FC, useEffect } from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import useGetPageInfo from "../../../../../hooks/useGetPageInfo";
import { resetPageInfo } from "../../../../../store/pageInfoReducer";

const { TextArea } = Input;

const PageSetting: FC = () => {
  const dispatch = useDispatch();
  // 获取页面信息
  const pageInfo = useGetPageInfo();
  //实时更新form的值
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);
  //初始化form数据
  const [form] = Form.useForm();
  // form数据变化的回调
  const handleValueChange = () => {
    // console.log(form.getFieldsValue(), "form.getFieldsValue)");
    dispatch(resetPageInfo(form.getFieldsValue()));
  };
  return (
    <Form layout="vertical" onValuesChange={handleValueChange} initialValues={pageInfo} form={form}>
      <Form.Item label="页面标题" name="title" rules={[{ required: true, message: "页面标题不能为空!" }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="页面描述" name="desc">
        <TextArea placeholder="页面描述..." />
      </Form.Item>
      <Form.Item label="样式代码.." name="css">
        <TextArea placeholder="css..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="js..." />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
