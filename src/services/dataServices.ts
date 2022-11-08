import axios from "axios";
import { parseWithAll, parseWithOnlySerie } from "../utils/parseIbgeResponse";

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

            return { 
                ...parseWithAll(resultados),
                un: response.data[0].unidade
            };
        })
        .catch(function (error) {
            console.log(error);

            return null;
        })
}

export async function getVacasOrdenhadas(years: number[], locations: string[]) {
    let locationsString = ""
    if (locations.includes("Brasil"))
        locationsString = "N1[all]";

    locationsString += !locationsString ? "N2[" : "|N2[";
    locations.filter(x => x !== "BR").forEach(x => {
        switch (x) {
            case "Norte":
                locationsString += "1,";
                break;
            case "Nordeste":
                locationsString += "2,";
                break;
            case "Centro-Oeste":
                locationsString += "5,";
                break;
            case "Sudeste":
                locationsString += "3,";
                break;
            case "Sul":
                locationsString += "4,";
                break;
        }
    })
    locationsString += "]";

    const stringRequets = `https://servicodados.ibge.gov.br/api/v3/agregados/94/periodos/${years.join("|")}/variaveis/107?localidades=${locationsString}`;

    return await axios.get(stringRequets)
        .then(function (response) {
            const { series } = response.data[0].resultados[0]

            return { 
                ...parseWithOnlySerie(series),
                un: response.data[0].unidade
            };
        })
        .catch(function (error) {
            console.log(error);

            return null;
        })
}

export async function getOvinosTosquiados(years: number[], locations: string[]) {
    let locationsString = ""
    if (locations.includes("Brasil"))
        locationsString = "N1[all]";

    locationsString += !locationsString ? "N2[" : "|N2[";
    locations.filter(x => x !== "BR").forEach(x => {
        switch (x) {
            case "Norte":
                locationsString += "1,";
                break;
            case "Nordeste":
                locationsString += "2,";
                break;
            case "Centro-Oeste":
                locationsString += "5,";
                break;
            case "Sudeste":
                locationsString += "3,";
                break;
            case "Sul":
                locationsString += "4,";
                break;
        }
    })
    locationsString += "]";

    const stringRequets = `https://servicodados.ibge.gov.br/api/v3/agregados/95/periodos/${years.join("|")}/variaveis/108?localidades=${locationsString}`;

    return await axios.get(stringRequets)
        .then(function (response) {
            const { series } = response.data[0].resultados[0]

            return { 
                ...parseWithOnlySerie(series),
                un: response.data[0].unidade
            };
        })
        .catch(function (error) {
            console.log(error);

            return null;
        })
}

export async function getProduçãoPeixesFrutosMar(years: number[], products: string[], monetary: boolean) {
    const productsNumber = products.map(x => {
        switch (x) {
            case "Carpa":
                return 32861
            case "Curimatã, curimbatá":
                return 32865
            case "Dourado":
                return 32866
            case "Jatuarana, Piabanha e Piracanjuba":
                return 32867
            case "Lambari":
                return 32868
            case "Matrinxã":
                return 32869
            case "Pacu e patinga":
                return 32870
            case "Piau, Piapara, Piauçu, Piava":
                return 32871
            case "Pintado, Cachara, Cachapira e Pintachara, Surubim":
                return 32872
            case "Pirapitinga":
                return 32873
            case "Pirarucu":
                return 32874
            case "Tambacu, Tambatinga":
                return 32875
            case "Tambaqui":
                return 32876
            case "Tilápia":
                return 32877
            case "Traíra e Trairão":
                return 32878
            case "Truta":
                return 32879
            case "Tucunaré":
                return 32880
            case "Outros peixes":
                return 32881
            case "Alevinos":
                return 32886
            case "Camarão":
                return 32887
            case "Larvas e Pós-larvas de camarão":
                return 32888
            case "Ostras, Vieiras e Mexilhões":
                return 32889
            default:
                return 32890
        }
    })

    const stringRequets = `https://servicodados.ibge.gov.br/api/v3/agregados/3940/periodos/${years.join("|")}/variaveis/${monetary ? 215 : 4146}?localidades=N1[all]&classificacao=654[${productsNumber.join(",")}]`

    return await axios.get(stringRequets)
        .then(function (response) {
            const { resultados } = response.data[0];

            return { 
                ...parseWithAll(resultados),
                un: response.data[0].unidade
            };
        })
        .catch(function (error) {
            console.log(error);

            return null;
        })
}

export async function getProducaoOrigemAnimal(years: number[], products: string[], monetary: boolean) {
    const productsNumber = products.map(x => {
        switch (x) {
            case "Casulos do Bicho-da-Seda":
                return 2683
            case "Lã":
                return 2684
            case "Leite":
                return 2682
            case "Mel de Abelha":
                return 2687
            case "Ovos de Codorna":
                return 2686
            default:
                return 2685
        }
    })

    const stringRequets = `https://servicodados.ibge.gov.br/api/v3/agregados/74/periodos/${years.join("|")}/variaveis/${monetary ? 215 : 106}?localidades=N1[all]&classificacao=80[${productsNumber.join(",")}]`

    return await axios.get(stringRequets)
        .then(function (response) {
            const { resultados } = response.data[0];

            return { 
                ...parseWithAll(resultados),
                un: response.data[0].unidade
            };
        })
        .catch(function (error) {
            console.log(error);

            return null;
        })
}