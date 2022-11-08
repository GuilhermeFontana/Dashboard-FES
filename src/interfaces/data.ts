export interface IData {
    xLabels: string[];
    datas: {
        name: string;
        value0: number;
        value1?: number | undefined;
        value2?: number | undefined;
        value3?: number | undefined;
        value4?: number | undefined;
    }[];
    un: string;
};