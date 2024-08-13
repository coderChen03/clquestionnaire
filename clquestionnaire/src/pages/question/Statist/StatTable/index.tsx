import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination, Spin, Table, Typography } from "antd";
import { useRequest } from "ahooks";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";

//api
import { getStatInfoById } from "../../../../services/stat";

const { Title } = Typography;
type ListType = {
  selectedId: string;
  setSelectedId: (id: string) => void;
  setSelectedType: (type: string) => void;
};

const StatTable: FC<ListType> = (props) => {
  const { selectedId, setSelectedId, setSelectedType } = props;
  const { id } = useParams();
  // 获取问卷组件信息
  const { componentList } = useGetComponentInfo();
  //表格的数据源
  const [dataSource, setDataSource] = useState();
  // 页面总数
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // 请求获取问卷组件的统计数据信息
  const { loading } = useRequest(
    async () => {
      if (!id) return;
      return await getStatInfoById(id, { page, pageSize });
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(result = {}) {
        const { list, total } = result;
        //在赋值给表格数据源之前 给表格添加需要的key
        const dataSource = list.map((c: { [key: string]: any }) => {
          return { ...c, key: c._id };
        });
        // 给数据源赋值
        if (list) setDataSource(dataSource);
        if (total) setTotal(total);
      },
    }
  );
  //表格第一行
  const columns = componentList.map((c) => {
    const { fe_id = "", title, props, type } = c;
    return {
      title: (
        <span
          // inherit:继承
          style={{ color: fe_id === selectedId ? "#1890ff" : "inherit", cursor: "pointer" }}
          onClick={() => {
            setSelectedId(fe_id);
            setSelectedType(type);
          }}
        >
          {props.title || title}
        </span>
      ),
      dataIndex: fe_id,
    };
  });
  //页码改变的回调
  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };
  return (
    <>
      {loading ? (
        <Spin style={{ width: "100%", textAlign: "center", marginTop: "24px" }}></Spin>
      ) : (
        <>
          <div>
            <Title level={4}>答卷数量: {total}</Title>
          </div>
          {/* 表格展示 */}
          <div>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
          </div>
          {/* 分页 */}
          <div style={{ textAlign: "center", marginTop: "18px" }}>
            <Pagination current={page} onChange={handlePageChange} total={total} pageSize={pageSize} />
          </div>
        </>
      )}
    </>
  );
};

export default StatTable;
