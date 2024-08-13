import React, { FC } from "react";
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export type propsType = {
  items: { id: string; [key: string]: any }[]; //需要拖拽的列表
  children: JSX.Element | JSX.Element[]; //子组件
  onDragEnd: (oldIndex: number, newIndex: number) => void; //拖拽结束后的回调 用于更新拖拽结果
};

const SortableContainer: FC<propsType> = ({ children, items, onDragEnd }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //在鼠标点击移动8px后才被认为是一次拖拽事件（避免点击事件后的小范围移动）
      },
    })
  );
  // 拖拽结束后的回调
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((c) => c.id === active.id);
      const newIndex = items.findIndex((c) => c.id === over?.id);
      onDragEnd(oldIndex, newIndex);
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
