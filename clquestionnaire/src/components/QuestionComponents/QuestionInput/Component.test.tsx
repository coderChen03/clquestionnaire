import { render, screen } from "@testing-library/react";
import QuestionInput from "./Component";

// 测试用例
test("默认参数", () => {
  //渲染组件
  render(<QuestionInput />);
  //通过文本获取dom
  const p = screen.getByText("单行输入标题");
  //断言
  expect(p).toBeInTheDocument();
  const input = screen.getByPlaceholderText("请输入...");
  expect(input).toBeInTheDocument();
});

test("传入参数", () => {
  //渲染组件
  render(<QuestionInput title="你的姓名" placeholder="请输入姓名" />);
  //通过文本获取dom
  const p = screen.getByText("你的姓名");
  //断言
  expect(p).toBeInTheDocument();
  const input = screen.getByPlaceholderText("请输入姓名");
  expect(input).toBeInTheDocument();
});
