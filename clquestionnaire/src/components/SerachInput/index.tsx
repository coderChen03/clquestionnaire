import React, { FC, useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Button, Input } from "antd";
import { SERACH_INPUT_KEY } from "../../constant";

const { Search } = Input;

const SerachInput: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    let params = searchParams.get(SERACH_INPUT_KEY) || "";
    setValue(params);
  }, [searchParams]);
  // 受控搜索框
  const [value, setValue] = useState("");
  // 改变的回调
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  // 点击搜索的回调
  const onSearch = (value: string) => {
    nav({
      pathname,
      search: `${SERACH_INPUT_KEY}=${value}`,
    });
  };
  return <Search placeholder="请输入" value={value} onChange={onChange} allowClear enterButton={<Button>搜索</Button>} onSearch={onSearch} style={{ width: "260px" }} />;
};
export default SerachInput;
