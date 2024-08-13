import { FC, useEffect, useState } from "react";
import { Typography } from "antd";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getOptionStatInfo } from "../../../../services/stat";
import { getComponentByType } from "../../../../components/QuestionComponents";

const { Title } = Typography;

type ChartType = {
  selectedType: string;
  selectedId: string;
};

const StatChart: FC<ChartType> = (props) => {
  const { selectedType, selectedId } = props;
  const { id = "" } = useParams();
  //统计数据
  const [statList, setStatList] = useState([]);
  // 图表数据请求
  let { run } = useRequest(
    async (id, selectedId) => {
      return await getOptionStatInfo(id, selectedId);
    },
    {
      manual: true,
      onSuccess(result: { [key: string]: any }) {
        const { stat = [] } = result;
        setStatList(stat);
      },
    }
  );
  //监听组件id变化更新组件统计图表
  useEffect(() => {
    if (!selectedId || !id) return;
    run(id, selectedId);
  }, [selectedId, id]);
  // 生成统计图表
  const genderStatElement = () => {
    const config = getComponentByType(selectedType);
    if (!config) return <div>未选中组件</div>;
    const { StatComponent } = config;
    if (StatComponent) {
      return <StatComponent stat={statList} />;
    } else {
      return <div>该组件没有图表</div>;
    }
  };
  return (
    <>
      <Title level={4}>图表统计</Title>
      <div>{genderStatElement()}</div>
    </>
  );
};

export default StatChart;
