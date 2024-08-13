/**
 * @description 将问卷所有组件集成
 */

import QuestionInfo from "./QuestionInfo";
import QuestionInput from "./QuestionInput";
import QuestionParagraph from "./QuestionParagraph";
import QuestionRadio from "./QuestionRadio";
import QuestionTitle from "./QuestionTitle";
import QuestionTextArea from "./QuestionTextArea";
import QuestionCheckbox from "./QuestionCheckbox";

// 问卷组件列表
export const QuestionComponentList: { [key: string]: any } = {
  questionInput: QuestionInput,
  questionRadio: QuestionRadio,
  questionTitle: QuestionTitle,
  questionInfo: QuestionInfo,
  questionParagraph: QuestionParagraph,
  questionTextArea: QuestionTextArea,
  questionCheckbox: QuestionCheckbox,
};

export default QuestionComponentList;
