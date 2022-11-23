import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { getRandomColors } from "../../utils/randomColor";
import { IChart } from "../../interfaces/chart";
import "./style.scss";
import React from "react";

type BarChartProps = IChart;

export function BarsChart(props: BarChartProps) {
  const [width, setWidth] = React.useState(750);

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth > 800 ? 750 : window.innerWidth - 50);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BarChart
      width={width}
      height={450}
      data={props.data}
      margin={{ left: 75 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name">
        <Label
          value={props.xAxisLabel}
          offset={-10}
          position="insideBottomLeft"
        />
      </XAxis>
      <YAxis>
        <Label
          value={props.yAxisLabel}
          position="insideBottomLeft"
          angle={-90}
          offset={-20}
        />
      </YAxis>
      {props.legend && <Legend align="center" />}
      {(props.tooltip ||
        props.tooltip === null ||
        props.tooltip === undefined) && <Tooltip />}
      {props.xLabels.map((label, index) => {
        return (
          <Bar
            key={`line-${index}`}
            dataKey={`value${index}`}
            fill={getRandomColors()}
            name={label || " "}
          />
        );
      })}
    </BarChart>
  );
}
