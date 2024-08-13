import react, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { PAGE_KEY, PAGE_SIZE_KEY, PAGE_SIZE_COUNT_KEY } from "../../constant";

export type ListPaginationProps = {
  total: number;
};

const ListPagination: FC<ListPaginationProps> = (props) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const nav = useNavigate();
  const { total } = props;
  // 控制当前页码
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_COUNT_KEY);
  // 从当前 url中获取页码和页数
  useEffect(() => {
    // searchParams.get(PAGE_KEY) 拿到的是个 string类型
    let currentPage = parseInt(searchParams.get(PAGE_KEY) || "1");
    let currentPagesize = parseInt(searchParams.get(PAGE_SIZE_KEY) || PAGE_SIZE_COUNT_KEY.toString());
    setCurrent(currentPage);
    setPageSize(currentPagesize);
  }, [searchParams]);
  // 页码改变的回调
  const handlePageChange = (page: number, pageSize: number) => {
    // searchParams.set 需要的 value是 string类型
    searchParams.set(PAGE_KEY, page.toString());
    searchParams.set(PAGE_SIZE_KEY, pageSize.toString());
    //跳转
    nav({
      pathname,
      search: searchParams.toString(),
    });
  };

  return <Pagination current={current} onChange={handlePageChange} pageSize={pageSize} total={total} />;
};

export default ListPagination;
