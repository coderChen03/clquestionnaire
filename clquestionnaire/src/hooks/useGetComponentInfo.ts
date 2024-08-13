import { useSelector } from "react-redux";
//type
import { storeType } from "../store";
import { ComponentsInfoType } from "../store/componentsReducer";

const useGetComponentInfo = () => {
  // 从component store中获取存储的组件列表 和被选中id
  const { componentList = [], selectedId = "", copiedComponent } = useSelector<storeType>((store) => store.components.present) as ComponentsInfoType;
  //找到被选中的组件
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
  return { componentList, selectedId, selectedComponent, copiedComponent };
};

export default useGetComponentInfo;
