//@ts-nocheck

import axios from "axios";

export async function getEfetivoDosRebanhos(years: number[], herds: string[]) {
    const herdsNumber = herds.map(x => {
        switch (x) {
            case "Bovino":
                return 2670
            case "Bubalino":
                return 2675
            case "Caprino":
                return 2681
            case "Equino":
                return 2672
            case "Galináceo":
                return 32796
            case "Ovino":
                return 2677
            default:
                return 32794
        }
    })

    const stringRequets = `https://servicodados.ibge.gov.br/api/v3/agregados/3939/periodos/${years.join("|")}/variaveis/105?localidades=N1[all]&classificacao=79[${herdsNumber.join(",")}]`

    return await axios.get(stringRequets)
        .then(function (response) {
            const { resultados } = response.data[0];
            const data: {
                xLabels: string[],
                datas: {
                    name: string;
                    value0: number;
                    value1?: number | undefined;
                    value2?: number | undefined;
                    value3?: number | undefined;
                    value4?: number | undefined;
                }[]
            } = { xLabels: [], datas: [] };

            let index = 0
            resultados.forEach((res: any) => {
                const { classificacoes, series } = res;

                data.xLabels.push(Object.values(classificacoes[0].categoria)[0]);

                if (index === 0) {
                    data.datas = Object.entries(series[0].serie).map(([key, value]) => {
                        return {
                            name: key,
                            value0: Number(value)
                        };
                    });
                }
                else {
                    Object.values(series[0].serie).forEach((value, i) => {
                        data.datas[i] = {
                            ...data.datas[i],
                            ...Object.fromEntries([[`value${index}`, Number(value)]])
                        }
                    })
                }

                index++;
            });

            console.log(data)
            return data;
        })
        .catch(function (error) {
            console.log(error);

            return null;
        })
}