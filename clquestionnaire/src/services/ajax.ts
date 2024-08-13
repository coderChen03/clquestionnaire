import axios from "axios";
import { message } from "antd";
import { getUserToken } from "../utils/user-token";

// 创建一个axios实例
const instance = axios.create({
  timeout: 10 * 1000,
});
/**在 request（请求）拦截器中处理携带 token */
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getUserToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);
/** interceptors:拦截器 在 response（响应）拦截器中 统一处理 errno 和msg */
instance.interceptors.response.use((res) => {
  const resData = res.data || {};
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }
  return data;
});

export default instance;

export type resultType = {
  errno: number;
  data?: resDataType;
  msg?: string;
};

export type resDataType = {
  [key: string]: any;
};
