import React, { FC, useEffect, useState } from "react";
import { Space, Tabs } from "antd";
import type { TabsProps } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";

const RightPanel: FC = () => {
  const { selectedId } = useGetComponentInfo();
  //逻辑需求:在被选中id被改变会自动跳转到属性（prop）面板
  useEffect(() => {
    if (selectedId) setActiveKey("prop");
    else setActiveKey("setting");
  }, [selectedId]);
  //控制当前激活的面板
  const [activeKey, setActiveKey] = useState("prop");
  //面板配置信息
  const items: TabsProps["items"] = [
    {
      key: "prop",
      label: (
        <span>
          <Space>
            <FileTextOutlined />
            属性
          </Space>
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: "setting",
      label: (
        <span>
          <Space>
            <SettingOutlined />
            页面设置
          </Space>
        </span>
      ),
      children: <PageSetting />,
    },
  ];
  // tab 被点击的回调
  const handleTabClick = (key: string) => {
    setActiveKey(key);
  };
  return <Tabs activeKey={activeKey} items={items} onTabClick={handleTabClick} />;
};

export default RightPanel;
