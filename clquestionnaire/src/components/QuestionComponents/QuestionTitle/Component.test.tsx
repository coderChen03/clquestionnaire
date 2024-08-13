import { render, screen } from "@testing-library/react";
import QuestionTitle from "./Component";

// 测试用例
test("默认参数", () => {
  //渲染组件
  render(<QuestionTitle />);
  //通过文本获取dom
  const title = screen.getByText("一级标题");
  //断言
  expect(title).toBeInTheDocument();
});

test("传入参数", () => {
  render(<QuestionTitle text="标题" isCenter={true} level={3} />);
  const title = screen.getByText("标题");
  expect(title).toBeInTheDocument();
  expect(title.matches("h3")).toBeTruthy();
  const style = title.style;
  expect(style.textAlign).toBe("center");
});
