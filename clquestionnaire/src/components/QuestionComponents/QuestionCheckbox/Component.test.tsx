import { render, screen } from "@testing-library/react";
import QuestionCheckbox from "./Component";

test("默认参数", () => {
  //渲染组件
  render(<QuestionCheckbox />);
  const p = screen.getByText("多选标题");
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`item${i}`);
    expect(checkbox.getAttribute("checked")).toBeNull();
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(`多选${i}`);
    expect(label).toBeInTheDocument();
  }
});

test("传递参数", () => {
  let lists = [
    { value: "item1", label: "多选1", checked: true },
    { value: "item2", label: "多选2", checked: false },
    { value: "item3", label: "多选3", checked: false },
  ];

  render(<QuestionCheckbox title="你的学习方向" lists={lists} />);

  const p = screen.getByText("你的学习方向");
  expect(p).toBeInTheDocument();

  for (let i = 0; i < lists.length; i++) {
    const checkbox = screen.getByDisplayValue(lists[i].value);
    if (i === 0) {
      expect(checkbox.getAttribute("checked")).not.toBeNull();
    }
    expect(checkbox).toBeInTheDocument();
    const label = screen.getByText(lists[i].label);
    expect(label).toBeInTheDocument();
  }
});
