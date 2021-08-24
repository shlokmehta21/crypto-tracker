import React from "react";
import { LineChart, Line } from "recharts";

function SmallLineChart({ data, per7Change }) {
  const priceData = data.price.map((value) => ({ pv: value }));
  const color = per7Change > 0 ? "green" : "red";

  return (
    <LineChart width={150} height={52} data={priceData}>
      <Line
        type="linear"
        dataKey="pv"
        stroke={color}
        strokeWidth={3}
        dot={false}
      />
    </LineChart>
  );
}

export default SmallLineChart;
