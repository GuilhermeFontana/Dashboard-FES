import {
  Legend,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getRandomColors } from "../../utils/randomColor";

type PiesChartProps = {
  data: {
    name: string;
    value: number;
  }[];
  label?: boolean;
  legend?: boolean;
  tooltip?: boolean;
};

export function PizzaChart(props: PiesChartProps) {
  return (
    <PieChart width={750} height={450} data={props.data}>
      {props.legend && <Legend align="center" />}
      {(props.tooltip ||
        props.tooltip === null ||
        props.tooltip === undefined) && <Tooltip />}
      <Pie
        data={props.data}
        cx="50%"
        cy="50%"
        label={!(props.label === false)}
        labelLine={false}
        fill="#8884d8"
        dataKey="value"
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getRandomColors()} />
        ))}
      </Pie>
    </PieChart>
  );
}
