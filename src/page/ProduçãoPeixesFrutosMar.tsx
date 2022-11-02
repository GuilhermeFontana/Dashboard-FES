import * as React from "react";
import {
  Collapse,
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  CircularProgress,
  ListSubheader,
} from "@material-ui/core";
import { FilterList, Refresh } from "@material-ui/icons";
import { BarsChart } from "../components/BarsChart";
import { FilterForm } from "../components/FilterForm";
import { PageComponent } from "../components/PageComponent";
import { getProduçãoPeixesFrutosMar } from "../services/dataServices";
import "../styles/chart.scss";

type dataType = {
  xLabels: string[];
  datas: {
    name: string;
    value0: number;
    value1?: number | undefined;
    value2?: number | undefined;
    value3?: number | undefined;
    value4?: number | undefined;
  }[];
} | null;

export function ProduçãoPeixesFrutosMar() {
  const products = [
    "Carpa",
    "Curimatã, curimbatá",
    "Dourado",
    "Jatuarana, Piabanha e Piracanjuba",
    "Lambari",
    "Matrinxã",
    "Pacu e patinga",
    "Piau, Piapara, Piauçu, Piava",
    "Pintado, Cachara, Cachapira e Pintachara, Surubim",
    "Pirapitinga",
    "Pirarucu",
    "Tambacu, Tambatinga",
    "Tambaqui",
    "Tilápia",
    "Traíra e Trairão",
    "Truta",
    "Tucunaré",
    "Outros peixes",
    "Alevinos",
    "Camarão",
    "Larvas e Pós-larvas de camarão",
    "Ostras, Vieiras e Mexilhões",
    "Sementes de moluscos"
  ];
  const anos = ["2013", "2015", "2017", "2019", "2021"];

  const [data, setData] = React.useState<dataType>(null);
  const [formShow, setFormShow] = React.useState(true);
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const [selectedAnos, setSelectedAnos] = React.useState<string[]>([]);

  function handleChangeSelectedProducts(
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    setSelectedProducts(event.target.value as string[]);
  }

  function handleChangeSelectedAnos(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let _selectedAnos = selectedAnos;

    if (event.target.checked && !selectedAnos.includes(event.target.value))
      _selectedAnos.push(event.target.value);
    else {
      console.log(event.target.value);
      _selectedAnos = _selectedAnos.filter((x) => x !== event.target.value);
    }

    setSelectedAnos([..._selectedAnos]);
  }

  function handleSubmit() {
    setFormShow(false);
    setData(null);

    const execute = async () => {
      setData(
        await getProduçãoPeixesFrutosMar(
          selectedAnos.map((x) => Number(x)),
          selectedProducts
        )
      );
    };
    execute();
  }

  return (
    <PageComponent title="Produção de Peixes e Frutos do Mar">
      <div className="chart">
        <header>
          <strong>Produção de Peixes e Frutos do Mar</strong>
          <div className="actions">
            <FilterList
              color="primary"
              onClick={() => setFormShow(!formShow)}
            />
            <Refresh color="primary" onClick={handleSubmit} />
          </div>
        </header>
        <main>
          <Box>
            <Collapse in={formShow}>
              <FilterForm onSubmit={handleSubmit}>
                <FormControl>
                  <InputLabel id="demo-mutiple-name-label">Produtos</InputLabel>
                  <Select
                    multiple
                    value={selectedProducts}
                    onChange={handleChangeSelectedProducts}
                    input={<Input />}
                  >
                    <ListSubheader>Peixes</ListSubheader>
                    {products.map(
                      (value, index) =>
                        index < 18 && (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        )
                    )}
                    <ListSubheader>Frutos do Mar</ListSubheader>
                    {products.map(
                      (value, index) =>
                        index > 17 &&
                        index < 23 && (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel component="legend">Anos</FormLabel>
                  <FormGroup>
                    {anos.map((x) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedAnos.includes(x)}
                              color="primary"
                              onChange={handleChangeSelectedAnos}
                              value={x}
                              key={x}
                            />
                          }
                          label={x}
                        />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              </FilterForm>
            </Collapse>
            <Collapse in={!formShow}>
              {!!data && !!data.datas ? (
                <BarsChart
                  data={data.datas}
                  xLabels={data.xLabels}
                  tooltip
                  legend
                />
              ) : selectedAnos.length && selectedProducts.length ? (
                <div className="no-chart-box">
                  <CircularProgress />
                </div>
              ) : (
                <div className="no-chart-box">
                  <strong>Escolha os dados que deseja ver nos filtros</strong>
                  <FilterList color="primary" />
                </div>
              )}
            </Collapse>
          </Box>
        </main>
      </div>
    </PageComponent>
  );
}
