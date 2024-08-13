import QuestionTitle from "./Component";
import PropComponent from "./PropComponent";
// 将 "./Component"中的导出全部暴露出去
export * from "./Component";

export default {
  title: "标题",
  type: "questionTitle",
  Component: QuestionTitle,
  PropComponent,
};
