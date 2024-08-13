import { post } from "./ajax";

// 提交答卷
export const postAnswer = (answerInfo: { questionId: string; answerList: any }) => {
  const url = "/api/answer";
  return post(url, answerInfo);
};
