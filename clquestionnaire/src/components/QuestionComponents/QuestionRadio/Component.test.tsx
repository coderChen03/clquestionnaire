import { render, screen } from "@testing-library/react";
import QuestionRadio from "./Component";

test("默认参数", () => {
  //渲染组件
  render(<QuestionRadio />);
  const p = screen.getByText("单选标题");
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();
  }
});

test("传递参数", () => {
  let options = [
    { value: "item1", label: "前端" },
    { value: "item2", label: "后端" },
    { value: "item3", label: "大数据" },
  ];
  let value = "item1";
  render(<QuestionRadio title="你的学习方向" options={options} value={value} />);

  const p = screen.getByText("你的学习方向");
  expect(p).toBeInTheDocument();

  for (let i = 0; i < options.length; i++) {
    const radio = screen.getByDisplayValue(options[i].value);
    if (options[i].value === value) {
      expect(radio.getAttribute("checked")).not.toBeNull();
    }
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(options[i].label);
    expect(label).toBeInTheDocument();
  }
});
