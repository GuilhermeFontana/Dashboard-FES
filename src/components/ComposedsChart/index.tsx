import {
  Bar,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from "recharts";
import { IChart } from "../../interfaces/chart";
import { getRandomColors } from "../../utils/randomColor";

type ComposedsChartProps = IChart & {
  comp: {
    value: string;
    title?: string;
  };
};

export function ComposedsChart(props: ComposedsChartProps) {
  return (
    <ComposedChart width={750} height={450} data={props.data}>
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
          offset={5}
        />
      </YAxis>
      {props.legend && <Legend align="center" />}
      {(props.tooltip ||
        props.tooltip === null ||
        props.tooltip === undefined) && <Tooltip />}
      <Bar
        dataKey={props.comp.value}
        fill={getRandomColors()}
        name={props.comp.title || " "}
      />
      <Line
        type="monotone"
        dataKey={props.comp.value}
        stroke={getRandomColors()}
        name={props.comp.title || " "}
      />
    </ComposedChart>
  );
}
