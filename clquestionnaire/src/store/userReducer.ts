import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userStateType = {
  username: string;
  nickname: string;
};

// 初始化数据
const INIT_STATE: userStateType = { username: "", nickname: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer(state: userStateType, actions: PayloadAction<userStateType>) {
      return actions.payload;
    },
    logoutReducer() {
      return INIT_STATE;
    },
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
