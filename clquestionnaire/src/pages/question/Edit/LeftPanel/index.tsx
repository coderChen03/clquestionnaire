import React, { FC } from "react";
import { Space, Tabs } from "antd";
import type { TabsProps } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import ComponentLib from "./ComponentLib";
import Layers from "./Layers";

const LeftPanel: FC = () => {
  //面板配置信息
  const items: TabsProps["items"] = [
    {
      key: "componentLib",
      label: (
        <span>
          <Space>
            <AppstoreOutlined />
            组件库
          </Space>
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: "layer",
      label: (
        <span>
          <Space>
            <BarsOutlined />
            图层
          </Space>
        </span>
      ),
      children: <Layers />,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={items} />;
};

export default LeftPanel;
