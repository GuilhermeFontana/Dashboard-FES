import React from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IChart } from "../../interfaces/chart";
import { getRandomColors } from "../../utils/randomColor";

type BiaxialLineChartProps = IChart;

export function BiaxialLineChart(props: BiaxialLineChartProps) {
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
    <LineChart
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
      <YAxis yAxisId="left">
        <Label
          value={props.yAxisLabel}
          position="insideBottomLeft"
          angle={-90}
          offset={-40}
        />
      </YAxis>
      {props.legend && <Legend align="center" />}
      {(props.tooltip ||
        props.tooltip === null ||
        props.tooltip === undefined) && <Tooltip />}
      {props.xLabels.map((label, index) => {
        return (
          <Line
            key={`line-${index}`}
            yAxisId="left"
            type="monotone"
            dataKey={`value${index}`}
            stroke={getRandomColors()}
            name={label || " "}
          />
        );
      })}
    </LineChart>
  );
}
