export interface IChart {
    data: {
        name: string;
        value0: number;
        value1?: number;
        value2?: number;
        value3?: number;
        value4?: number;
      }[];
      yAxisLabel?: string;
      xAxisLabel?: string;
      legend?: boolean;
      tooltip?: boolean;
      xLabels: string[];
}
