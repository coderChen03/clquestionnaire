import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// redux-tookits2.0开始内置了immer
import { produce } from "immer";

export type pageInfoType = {
  title?: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};

const INIT_STATE: pageInfoType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};

export const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    //重置页面信息
    resetPageInfo: (state: pageInfoType, action: PayloadAction<pageInfoType>) => {
      return action.payload;
    },
    //修改页面标题
    changePageTitle: produce((draft: pageInfoType, action: PayloadAction<string>) => {
      draft.title = action.payload;
    }),
  },
});

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
