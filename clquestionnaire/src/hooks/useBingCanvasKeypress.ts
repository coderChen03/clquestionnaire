import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { deleteComponent, copyComponent, pasteComponent, moveSelectBox } from "../store/componentsReducer";
// 引入撤销重做的方法
import { ActionCreators } from "redux-undo";
import useGetComponentInfo from "./useGetComponentInfo";

/**
 * @description  判断鼠标光标位置是否合法
 * @returns boolean
 */
const isActiveElementValid = () => {
  let activeElement = document.activeElement;
  // 使用dnd-kit会在外面包裹一层div，拖拽事件会影响原本的键盘事件 需要多判断一次 activeElement?.matches('div[role="button"]')
  if (activeElement === document.body || activeElement?.matches('div[role="button"]')) return true;
  return false;
};

const useBingCanvasKeyPress = () => {
  const dispatch = useDispatch();
  const { selectedId } = useGetComponentInfo();
  //删除快捷键
  useKeyPress(["backspace"], () => {
    //当鼠标在合法位置可才去执行
    !!selectedId && isActiveElementValid() && dispatch(deleteComponent());
  });
  // 复制快捷键
  useKeyPress(["ctrl.c", "meta.c"], () => {
    !!selectedId && isActiveElementValid() && dispatch(copyComponent());
  });
  // 粘贴快捷键
  useKeyPress(["ctrl.v", "meta.v"], () => {
    !!selectedId && isActiveElementValid() && dispatch(pasteComponent());
  });
  //选中框上移
  useKeyPress(["uparrow"], () => {
    !!selectedId && isActiveElementValid() && dispatch(moveSelectBox("up"));
  });
  //选中框下移
  useKeyPress(["downarrow"], () => {
    !!selectedId && isActiveElementValid() && dispatch(moveSelectBox("down"));
  });
  //后退
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      isActiveElementValid() && dispatch(ActionCreators.undo());
    },
    {
      exactMatch: true, //严格匹配 只按了 ctrl.z 才会触发
    }
  );
  //前进
  useKeyPress(
    ["ctrl.shift.z", "meta.shift.z"],
    () => {
      isActiveElementValid() && dispatch(ActionCreators.redo());
    },
    {
      exactMatch: true, //严格匹配 只按了 ctrl.z 才会触发
    }
  );
};

export default useBingCanvasKeyPress;
