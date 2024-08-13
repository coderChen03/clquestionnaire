/**
 * @description 配置各个组件信息
 */
import { FC } from "react";
import QuestionTitle, { QuestionTitleType } from "./QuestionTitle";
import QuestionInput, { QuestionInputType } from "./QuestionInput";
import QuestionParagraph, { QuestionParagraphType } from "./QuestionParagraph";
import QuestionInfo, { QuestionInfoType } from "./QuestionInfo";
import QuestionTextArea, { QuestionTextAreaType } from "./QuestionTextArea";
import QuestionRadio, { QuestionRadioType, statComponentType } from "./QuestionRadio";
import QuestionCheckbox, { QuestionCheckboxType, statComponentCheckboxType } from "./QuestionCheckbox";

// 统一， 所有组件 props类型
export type ComponentsPropsType = QuestionInputType & QuestionTitleType & QuestionParagraphType & QuestionInfoType & QuestionTextAreaType & QuestionRadioType & QuestionCheckboxType;
// 统一， 所有图表统计组件 props类型
export type ComponentsStatPropsType = statComponentType & statComponentCheckboxType;
// 统一， 所有组件的配置
export type ComponentsConfigType = {
  title: string;
  type: string; //分别不同的组件 需要唯一
  Component: FC<ComponentsPropsType>;
  PropComponent: FC<ComponentsPropsType>;
  StatComponent?: FC<ComponentsStatPropsType>;
};
// 所有组件配置列表
const ComponentConfigList: ComponentsConfigType[] = [QuestionInput, QuestionTitle, QuestionParagraph, QuestionInfo, QuestionTextArea, QuestionRadio, QuestionCheckbox];
//将组件库分组
export const ComponentListGroup = [
  {
    groupType: "text",
    groupName: "文本显示",
    components: [QuestionTitle, QuestionParagraph, QuestionInfo],
  },
  {
    groupType: "input",
    groupName: "用户输入",
    components: [QuestionInput, QuestionTextArea],
  },
  {
    groupType: "select",
    groupName: "用户选择",
    components: [QuestionRadio, QuestionCheckbox],
  },
];

//通过类型查询对应组件方法
export const getComponentByType = (type: string) => {
  return ComponentConfigList.find((config) => config.type === type);
};
