type dataType = {
    xLabels: string[],
    datas: {
        name: string;
        value0: number;
        value1?: number | undefined;
        value2?: number | undefined;
        value3?: number | undefined;
        value4?: number | undefined;
    }[]
};

export function parseWithAll(resultados: any) {
    const data: dataType = { xLabels: [], datas: [] };

    let index = 0
    resultados.forEach((res: any) => {
        const { classificacoes, series } = res;

        data.xLabels.push(Object.values(classificacoes[0].categoria)[0] as string);

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
}

export function parseWithOnlySerie(series: any) {
    const data: dataType = { xLabels: [], datas: [] };

    let index = 0
    series.forEach((serie: any) => {
        data.xLabels.push(serie.localidade.nome);
        if (index === 0) {
            data.datas = Object.entries(serie.serie).map(([key, value]) => {
                return {
                    name: key,
                    value0: Number(value || 0)
                };
            });
        }
        else {
            Object.values(serie.serie).forEach((value, i) => {
                data.datas[i] = {
                    ...data.datas[i],
                    ...Object.fromEntries([[`value${index}`, Number(value)]])
                }
            })
        }

        index++;
    });

    console.log(data);
    return data;
}