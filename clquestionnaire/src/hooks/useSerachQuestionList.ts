import { useRequest } from "ahooks";
// api
import { getQuestionList } from "../services/question";
// 引入常量
import { PAGE_KEY, SERACH_INPUT_KEY, PAGE_SIZE_KEY, PAGE_SIZE_COUNT_KEY } from "../constant";

import { useSearchParams } from "react-router-dom";

export type OptionType = {
  isStar?: boolean;
  isDelete?: boolean;
};

const useSerachQuestionList = (option: OptionType = {}) => {
  const { isStar, isDelete } = option;
  const [searchParams] = useSearchParams();
  const request = async () => {
    // 获取搜索参数 params
    const keyword = searchParams.get(SERACH_INPUT_KEY) || "";
    const page = searchParams.get(PAGE_KEY) || "1";
    const pageSize = searchParams.get(PAGE_SIZE_KEY) || PAGE_SIZE_COUNT_KEY.toString();
    //请求问卷列表数据
    const res = await getQuestionList({ keyword, isStar, isDelete, page, pageSize });
    return res;
  };
  //useRequest:第一个参数需要一个异步函数
  const { data, loading, refresh } = useRequest(request, {
    refreshDeps: [searchParams],
  });
  return { data, loading, refresh };
};
export default useSerachQuestionList;
