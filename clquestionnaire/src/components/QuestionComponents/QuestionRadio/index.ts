import QuestionRadio from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";
// 将 "./Component"中的导出全部暴露出去（我们将类型没有提取到一个单独的文件夹，需要从各个组件中获取相应的类型）
export * from "./Component";

export * from "./StatComponent";

export default {
  title: "单选框",
  type: "questionRadio",
  Component: QuestionRadio, //组件 用于画布上
  PropComponent, //属性面板组件
  StatComponent, //统计图表组件
};
