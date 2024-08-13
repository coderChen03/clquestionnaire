import { ComponentType } from "./index";
/**
 * componentList 组件列表
 * id 被选中的id
 */

export const getNextSelectId = (componentList: ComponentType[], id: string) => {
  // 将原先已经被隐藏的过滤掉 再进行操作
  let filterList = componentList.filter((com) => !com.isHide);
  //找到当前被选择的下标
  let index = filterList.findIndex((com) => com.fe_id === id);
  if (index < 0 || filterList.length <= 1) return "";
  //如果删除的是最后一个则往前走 否则往后
  if (index === filterList.length - 1) {
    return filterList[index - 1].fe_id;
  } else {
    return filterList[index + 1].fe_id;
  }
};
