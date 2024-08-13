import { render, screen } from "@testing-library/react";
import QuestionInfo from "./Component";

// 测试用例
test("默认参数", () => {
  //渲染组件
  render(<QuestionInfo />);
  //通过文本获取dom
  const title = screen.getByText("问卷标题");
  //断言
  expect(title).toBeInTheDocument();
});

test("传入参数", () => {
  render(<QuestionInfo title="hello" desc="这是一段描述" />);
  const title = screen.getByText("hello");
  expect(title).toBeInTheDocument();
  const paragraph = screen.getByText("这是一段描述");
  expect(paragraph).toBeInTheDocument();
});

test("多行输入", () => {
  render(<QuestionInfo desc={"a\nb\nc"} />);
  const span = screen.getByText("a");
  expect(span).toBeInTheDocument();
  expect(span).toHaveTextContent("a");
  expect(span).not.toHaveTextContent("ab"); //换行了
});
