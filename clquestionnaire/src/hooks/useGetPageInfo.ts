import { useSelector } from "react-redux";
import type { storeType } from "../store";

const useGetPageInfo = () => {
  // 从pageInfo store中取值
  let pageInfo = useSelector((store: storeType) => store.pageInfo);
  return pageInfo;
};

export default useGetPageInfo;
