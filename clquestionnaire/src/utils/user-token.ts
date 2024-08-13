/**
 * @description token处理 （获取 设置 删除）
 */
const TOKEN_KEY = "CLQUESTION_TOKEN";

export const getUserToken = () => {
  return localStorage.getItem(TOKEN_KEY) || "";
};

export const setUserToken = (token: string) => {
  return localStorage.setItem(TOKEN_KEY, token);
};

export const removeUserToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};
