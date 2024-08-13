import axios, { resDataType } from "./ajax";

export type SearchParams = {
  keyword: string;
  isStar: boolean;
  isDelete: boolean;
  page: string; //设计成 string类型是因为 我们在使用 searchParams.get时是 string类型
  pageSize: string;
};

//获取单个问卷信息
export const getQuestionService = (_id: string): Promise<resDataType> => {
  const url = `/api/question/${_id}`;
  const data = axios.get(url);
  return data;
};
//创建问卷
export const createQuestion = (): Promise<resDataType> => {
  const url = "/api/question/";
  const data = axios.post(url);
  return data;
};
//获取（查询）问卷列表
export const getQuestionList = (option: Partial<SearchParams> = {}): Promise<resDataType> => {
  const url = "/api/question/";
  const data = axios.get(url, { params: option });
  return data;
};
//更新问卷
export const updateQuestion = (_id: string, option: { [key: string]: any }): Promise<resDataType> => {
  const url = `/api/question/${_id}`;
  const data = axios.patch(url, option);
  return data;
};
//复制问卷
export const duplicateQuestion = (_id: string): Promise<resDataType> => {
  const url = `/api/question/duplicate/${_id}`;
  const data = axios.post(url);
  return data;
};
// 彻底删除问卷
export const deleteQuestion = (ids: string[]): Promise<resDataType> => {
  const url = `/api/question`;
  const data = axios.delete(url, { data: { ids } });
  return data;
};
