import { configureStore } from "@reduxjs/toolkit";
// 引入 redux-undo 用于数据撤销和重做（后退和前进）
import undoable, { excludeAction, StateWithHistory } from "redux-undo";

import userReducer, { userStateType } from "./userReducer";
import componentsReducer, { ComponentsInfoType } from "./componentsReducer";
import pageInfoReducer, { pageInfoType } from "./pageInfoReducer";

export type storeType = {
  user: userStateType;
  components: StateWithHistory<ComponentsInfoType>; //增加undo
  pageInfo: pageInfoType;
};

export default configureStore({
  //模块
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        //屏蔽指定的 action
        "components/resetComponents", //重置组件配置信息
        "components/changeSelectedId", // 修改 selectedId
        "components/moveSelectBox", //移动选中框
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
});
