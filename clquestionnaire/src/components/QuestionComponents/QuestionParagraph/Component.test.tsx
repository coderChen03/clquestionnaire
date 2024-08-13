import { render, screen } from "@testing-library/react";
import QuestionParagraph from "./Component";

// 测试用例
test("默认参数", () => {
  //渲染组件
  render(<QuestionParagraph />);
  //通过文本获取dom
  const span = screen.getByText("这是一个段落");
  //断言
  expect(span).toBeInTheDocument();
});

test("传入参数", () => {
  render(<QuestionParagraph text="段落" isCenter={true} />);
  const span = screen.getByText("段落");
  expect(span).toBeInTheDocument();
  const p = span.parentElement;
  expect(p).not.toBeNull();
  const style = p!.style || {};
  expect(style.textAlign).toBe("center");
});
test("多行输入", () => {
  render(<QuestionParagraph text={"a\nb\nc"} />);
  const span = screen.getByText("a");
  expect(span).toBeInTheDocument();
  expect(span).toHaveTextContent("a");
  expect(span).not.toHaveTextContent("ab"); //换行了
});
