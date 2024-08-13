import { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
//api
import { getUserinfo } from "../services/user";

import useGetUserinfo from "./useGetUserinfo";
import { loginReducer } from "../store/userReducer";
import { getUserToken } from "../utils/user-token";

const useLoadUserdata = () => {
  const dispatch = useDispatch();
  const [waitingUserdata, setWaitingUserdata] = useState(true);
  //从user store中获取用户信息
  const { username, nickname } = useGetUserinfo();
  let token = getUserToken();
  // 判断user store是否存在用户信息 // 判断是否有token 有则请求数据 没有则返回
  useEffect(() => {
    if (username || !token) {
      setWaitingUserdata(false);
      return;
    } else {
      run();
    }
  }, [username, nickname, token]);
  // 请求用户信息
  let { run } = useRequest(async () => await getUserinfo(), {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      // 存储结果到 user store中
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserdata(false);
    },
  });
  return waitingUserdata;
};

export default useLoadUserdata;
