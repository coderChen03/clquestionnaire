import { render, screen } from "@testing-library/react";
import QuestionTextArea from "./Component";

// 测试用例
test("默认参数", () => {
  //渲染组件
  render(<QuestionTextArea />);
  //通过文本获取dom
  const p = screen.getByText("多行输入标题");
  //断言
  expect(p).toBeInTheDocument();
  const textarea = screen.getByPlaceholderText("请输入...");
  expect(textarea).toBeInTheDocument();
});

test("传入参数", () => {
  //渲染组件
  render(<QuestionTextArea title="你的爱好" placeholder="请输入爱好" />);
  //通过文本获取dom
  const p = screen.getByText("你的爱好");
  //断言
  expect(p).toBeInTheDocument();
  const textarea = screen.getByPlaceholderText("请输入爱好");
  expect(textarea).toBeInTheDocument();
});
