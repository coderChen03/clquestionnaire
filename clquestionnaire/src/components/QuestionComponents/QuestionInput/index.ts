import QuestionInput from "./Component";
import PropComponent from "./PropComponent";
// 将 "./Component"中的导出全部暴露出去
export * from "./Component";

export default {
  title: "输入框",
  type: "questionInput",
  Component: QuestionInput, //组件 用于画布上
  PropComponent, //面板组件
};
