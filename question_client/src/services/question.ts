import { get } from "./ajax";

// 提交答卷
export const getQuestionById = (id: string) => {
  const url = `/api/question/${id}`;
  return get(url);
};
