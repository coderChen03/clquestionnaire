import axios, { resDataType } from "./ajax";

export type userinfoType = {
  username: string;
  password: string;
  nickname?: string;
};
// 获取用户信息
export const getUserinfo = (): Promise<resDataType> => {
  const url = `/api/user/info`;
  const data = axios.get(url);
  return data;
};
// 注册
export const getUserRegister = (body: userinfoType): Promise<resDataType> => {
  const url = `/api/user/register`;
  const data = axios.post(url, body);
  return data;
};
// 登录
export const getUserLogin = (body: { username: string; password: string }): Promise<resDataType> => {
  const url = `/api/user/login`;
  const data = axios.post(url, body);
  return data;
};
