import QuestionCheckbox from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";
// 将 "./Component"中的导出全部暴露出去
export * from "./Component";

export * from "./StatComponent";

export default {
  title: "多选框",
  type: "questionCheckbox",
  Component: QuestionCheckbox, //组件 用于画布上
  PropComponent, //面板组件
  StatComponent, //统计图表组件
};
