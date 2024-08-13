import React, { FC, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CONST_COLORS } from "../../../constant";

export type statComponentType = {
  stat: { name: string; count: number }[];
};

const StatComponent: FC<statComponentType> = ({ stat }) => {
  // 计算和
  const sum = useMemo(() => {
    return stat.reduce((total, cur) => {
      return total + cur.count;
    }, 0);
  }, [stat]);
  // 格式成百分比
  const format = (count: number) => {
    // toFixed(2):保留两位小数
    return (count * 100).toFixed(2);
  };

  return (
    <div style={{ width: "300px", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="count" data={stat} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" fontSize={12} label={(i) => i.name + ":" + format(i.count / sum) + "%"}>
            {stat.map((item, index) => {
              return <Cell key={`cell-${index}`} fill={CONST_COLORS[index % CONST_COLORS.length]}></Cell>;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
