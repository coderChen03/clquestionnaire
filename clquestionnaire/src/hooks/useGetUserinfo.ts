
import { useSelector } from "react-redux";
import { storeType } from "../store";
import { userStateType } from "../store/userReducer";

const useGetUserinfo = () => {
  const { username, nickname } = useSelector<storeType>((store) => store.user) as userStateType;
  return { username, nickname };
};

export default useGetUserinfo;
