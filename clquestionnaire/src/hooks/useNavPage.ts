import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUserinfo from "./useGetUserinfo";
import { MANAGE_LIST_PATHNAME, LOGIN_PATHNAME, isLoginOrRegisterPath, isNONeedUserinfoPath } from "../router";

const useNavPage = (waitingUserdata: boolean) => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  let { username } = useGetUserinfo();

  // 判断登录 or 未登录状态
  useEffect(() => {
    if (waitingUserdata) return;
    if (username) {
      // 登录
      if (isLoginOrRegisterPath(pathname)) {
        nav(MANAGE_LIST_PATHNAME);
      }
      return;
    }
    // 未登录
    if (!isNONeedUserinfoPath(pathname)) {
      nav(LOGIN_PATHNAME);
    } else {
      return;
    }
  }, [waitingUserdata, username, pathname]);
};

export default useNavPage;
