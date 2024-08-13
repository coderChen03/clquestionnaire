import React, { FC } from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CONST_COLORS } from "../../../constant";

export type statComponentCheckboxType = {
  stat: { name: string; count: number }[];
};

const StatComponent: FC<statComponentCheckboxType> = ({ stat }) => {
  return (
    <div style={{ width: "400px", height: "300px", marginLeft: "-18px" }}>
      <ResponsiveContainer width="80%" height="100%">
        <BarChart
          data={stat}
          margin={{
            top: 5,
            right: 30,
            // left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" label={{ position: "top" }}>
            {stat.map((item, index) => {
              return <Cell key={`cell-${index}`} fill={CONST_COLORS[index % CONST_COLORS.length]}></Cell>;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
