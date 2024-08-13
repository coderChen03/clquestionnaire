import QuestionParagraph from "./Component";
import PropComponent from "./PropComponent";
// 将 "./Component"中的导出全部暴露出去
export * from "./Component";

export default {
  title: "段落",
  type: "questionParagraph",
  Component: QuestionParagraph,
  PropComponent,
};
