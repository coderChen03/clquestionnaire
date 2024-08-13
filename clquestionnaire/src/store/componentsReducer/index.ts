import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
// 从lodash库中引入 clonedeep深拷贝
import clonedeep from "lodash.clonedeep";
import { ComponentsPropsType } from "../../components/QuestionComponents";
import { getNextSelectId } from "./utils";
// dn-kit第三方拖拽库提供的更新拖拽后的顺序--方法
import { arrayMove } from "@dnd-kit/sortable";

//单个组件信息类型
export type ComponentType = {
  fe_id: string; //fe_id是因为数据库mongodb会自动生成一个_id,前端生成的_id格式在mongodb中是不认可的,多添加一个id供前端操作
  type: string;
  title: string;
  isHide?: boolean;
  isLocked?: boolean;
  props: ComponentsPropsType;
};
//组件 list信息类型
export type ComponentsInfoType = {
  componentList: ComponentType[];
  selectedId: string;
  copiedComponent: ComponentType | null;
};

//初始化数据
let INIT_STATE: ComponentsInfoType = {
  componentList: [],
  selectedId: "",
  copiedComponent: null,
};

export const componentSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    //重置组件配置信息 向后端获取相应 id的画布
    resetComponents(state: ComponentsInfoType, action: PayloadAction<ComponentsInfoType>) {
      return action.payload;
    },
    // 修改 selectedId
    changeSelectedId: produce((draft: ComponentsInfoType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),
    //添加组件信息
    addComponent: produce((draft: ComponentsInfoType, action: PayloadAction<ComponentType>) => {
      //逻辑:当有选中id,则插入到选中 id组件的下面 或者插入到最后面
      let index = draft.componentList.findIndex((i) => i.fe_id === draft.selectedId);
      if (index >= 0) {
        //找到了
        draft.componentList.splice(index + 1, 0, action.payload);
      } else {
        //未找到
        draft.componentList.push(action.payload);
      }
      //将选中 id修改为新添加的组件 id
      draft.selectedId = action.payload.fe_id;
    }),
    // 更新prop属性值
    updateComponent: produce((draft: ComponentsInfoType, action: PayloadAction<{ fe_id: string; newProps: ComponentsPropsType }>) => {
      const { fe_id, newProps } = action.payload;
      //通过 id找到更新的组件
      let component = draft.componentList.find((c) => c.fe_id === fe_id);
      if (component) {
        component.props = newProps;
      }
    }),
    //删除选中的组件
    deleteComponent: produce((draft: ComponentsInfoType) => {
      const { componentList = [], selectedId = "" } = draft;
      // 在删除前找到下一个被选中的id
      let nextId = getNextSelectId(componentList, selectedId);
      let index = componentList.findIndex((component) => component.fe_id === selectedId);
      componentList.splice(index, 1);
      //删除后 自动选择下一个id
      draft.selectedId = nextId;
    }),
    // 切换显示和隐藏组件
    /**这里需要传递切换的id 是因为设计中*显示是在图层里,不是只有选中才能操作,所以为了统一函数都加入了id参数*/
    toggleComponentHide: produce((draft: ComponentsInfoType, action: PayloadAction<{ fe_id: string; isHide: boolean }>) => {
      const { componentList } = draft;
      const { fe_id, isHide } = action.payload;
      // 在隐藏前找到下一个被选中的id
      let nextId = getNextSelectId(componentList, fe_id);
      let component = componentList.find((com: ComponentType) => com.fe_id === fe_id);
      if (!component) return;
      if (!isHide) {
        //要显示 设置为显示的id
        draft.selectedId = component.fe_id;
      } else {
        //要隐藏 自动选择下一个id
        draft.selectedId = nextId;
      }
      component.isHide = isHide;
    }),
    // 切换锁定和解锁组件
    toggleComponentLocked: produce((draft: ComponentsInfoType, action: PayloadAction<string>) => {
      let component = draft.componentList.find((com) => com.fe_id === action.payload);
      if (component) {
        component.isLocked = !component.isLocked;
      }
    }),
    // 复制组件信息
    copyComponent: produce((draft: ComponentsInfoType) => {
      const { componentList = [], selectedId = "" } = draft;
      let component = componentList.find((com) => com.fe_id === selectedId);
      if (component) {
        //深拷贝 shallow：浅的，不深的
        draft.copiedComponent = clonedeep(component);
      }
    }),
    // 粘贴组件信息
    pasteComponent: produce((draft: ComponentsInfoType) => {
      const { componentList, copiedComponent, selectedId } = draft;
      if (!copiedComponent) return;
      // 需要改变复制 copiedComponent中的fe_id
      copiedComponent.fe_id = nanoid();
      //如果有选中id 则添加到下一个，否则添加到最后一个
      let index = componentList.findIndex((com) => com.fe_id === selectedId);
      if (index >= 0) {
        componentList.splice(index + 1, 0, copiedComponent);
      } else {
        componentList.push(copiedComponent);
      }
      //自动选中新粘贴的组件
      draft.selectedId = copiedComponent.fe_id;
    }),
    //移动选中框 （根据上移或者下移改变选中id）
    moveSelectBox: produce((draft: ComponentsInfoType, action: PayloadAction<string>) => {
      const { componentList = [], selectedId = "" } = draft;
      if (!selectedId) return;
      //先过滤掉被隐藏的组件
      let filterList = componentList.filter((com) => !com.isHide);
      //找到被选中组件的下标
      let index = filterList.findIndex((com) => com.fe_id === selectedId);
      //根据传入的参数做对应的操作
      switch (action.payload) {
        //上移
        case "up":
          if (index > 0) {
            draft.selectedId = filterList[index - 1].fe_id;
          }
          break;
        case "down":
          if (index >= 0 && index < filterList.length - 1) {
            draft.selectedId = filterList[index + 1].fe_id;
          }
          break;
        default:
          break;
      }
    }),
    // 更新组件title（name）信息
    updateComponentTitle: produce((draft: ComponentsInfoType, action: PayloadAction<{ fe_id: string; title: string }>) => {
      const { fe_id, title } = action.payload;
      let targetComp = draft.componentList.find((comp) => comp.fe_id === fe_id);
      if (targetComp) targetComp.title = title;
    }),
    // 拖拽更新组件列表顺序
    dargUpdateComponent: produce((draft: ComponentsInfoType, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload;
      const { componentList: curComponentList } = draft;
      //调用 dn-kit第三方拖拽库提供的更新拖拽后的顺序--方法
      draft.componentList = arrayMove(curComponentList, oldIndex, newIndex);
    }),
    // 移动更新组件列表顺序
    moveUpdateComponent: produce((draft: ComponentsInfoType, action: PayloadAction<"up" | "down">) => {
      const { componentList: curComponentList, selectedId } = draft;
      let index = curComponentList.findIndex((com) => com.fe_id === selectedId);
      //没有找到
      if (index < 0) return;
      //如果有则做类型判断
      switch (action.payload) {
        case "up": {
          if (index > 0) draft.componentList = arrayMove(curComponentList, index, index - 1);
          break;
        }
        case "down": {
          if (index < curComponentList.length - 1) draft.componentList = arrayMove(curComponentList, index, index + 1);
          break;
        }
        default:
          break;
      }
    }),
  },
});

export const { resetComponents, changeSelectedId, addComponent, updateComponent, deleteComponent, toggleComponentHide, toggleComponentLocked, copyComponent, pasteComponent, moveSelectBox, updateComponentTitle, dargUpdateComponent, moveUpdateComponent } = componentSlice.actions;

export default componentSlice.reducer;
