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

type BarChartProps = IChart;

export function BarsChart(props: BarChartProps) {
  return (
    <BarChart width={750} height={450} data={props.data} margin={{ left: 75 }}>
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
            dataKey={`value${index}`}
            fill={getRandomColors()}
            name={label || " "}
          />
        );
      })}
    </BarChart>
  );
}
