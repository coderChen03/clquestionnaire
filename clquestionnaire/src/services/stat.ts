import axios, { resDataType } from "./ajax";

// 通过问卷id获取问卷统计信息
export const getStatInfoById = (questionId: string, opt: { page: number; pageSize: number }): Promise<resDataType> => {
  const url = `/api/stat/${questionId}`;
  return axios.get(url, { params: opt });
};
//获取单个组件选项的统计信息
export const getOptionStatInfo = (questionId: string, componentId: string) => {
  const url = `/api/stat/${questionId}/${componentId}`;
  return axios.get(url);
};
