import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IChart } from "../../interfaces/chart";
import { getRandomColors } from "../../utils/randomColor";

type BiaxialLineChartProps = IChart ;

export function BiaxialLineChart(props: BiaxialLineChartProps) {
  return (
    <LineChart width={750} height={450} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" />
      {props.legend && <Legend align="center" />}
      {(props.tooltip ||
        props.tooltip === null ||
        props.tooltip === undefined) && <Tooltip />}
      {props.xLabels.map((label, index) => {
        return (
          <Line
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
