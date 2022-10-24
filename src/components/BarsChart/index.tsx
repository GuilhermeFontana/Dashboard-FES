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
import "./style.scss";

type BarChartProps = {
  data: {
    name: string;
    value0: number;
    value1?: number;
    value2?: number;
    value3?: number;
    value4?: number;
  }[];
  bars: {
    title?: string;
  }[];
  yAxisLabel: string;
  xAxisLabel: string;
  legend?: boolean;
  tooltip?: boolean;
};

export function BarsChart(props: BarChartProps) {
  return (
    <BarChart width={750} height={450} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name">
        <Label
          value={props.xAxisLabel}
          offset={-10}
          position="insideBottomLeft"
        />
      </XAxis>
      <YAxis >
        <Label
          value={props.yAxisLabel}
          position="insideBottomLeft"
          angle={-90}
          offset={5}
        />
      </YAxis>
      {props.legend && <Legend align="center" />}
      {(props.tooltip ||
        props.tooltip === null ||
        props.tooltip === undefined) && <Tooltip />}
      {props.bars.map((bar, index) => {
        return (
          <Bar
            dataKey={`value${index}`}
            fill={getRandomColors()}
            name={bar.title || " "}
          />
        );
      })}
    </BarChart>
  );
}
