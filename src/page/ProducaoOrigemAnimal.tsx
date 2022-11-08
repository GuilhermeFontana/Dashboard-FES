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
  Switch,
  Grid,
} from "@material-ui/core";
import { FilterList, Refresh } from "@material-ui/icons";
import { BarsChart } from "../components/BarsChart";
import { BiaxialLineChart } from "../components/BiaxialLineChart";
import { FilterForm } from "../components/FilterForm";
import { PageComponent } from "../components/PageComponent";
import { getProducaoOrigemAnimal } from "../services/dataServices";
import { IData } from "../interfaces/data";
import "../styles/chart.scss";

type dataType = IData | null;

export function ProducaoOrigemAnimal() {
  const produtos = [
    "Casulos do Bicho-da-Seda",
    "Lã",
    "Leite",
    "Mel de Abelha",
    "Ovos de Codorna",
    "Ovos de Galinha",
  ];
  const anos = ["2001", "2006", "2011", "2016", "2021"];

  const [data, setData] = React.useState<dataType>(null);
  const [formShow, setFormShow] = React.useState(true);
  const [switchValue, setswitchValue] = React.useState(false);
  const [selectedProdutos, setSelectProdutos] = React.useState<string[]>([]);
  const [selectedAnos, setSelectedAnos] = React.useState<string[]>([]);

  function handleChangeSelectedRebanhos(
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    setSelectProdutos(event.target.value as string[]);
  }

  function handleChangeSelectedAnos(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    let _selectedAnos = selectedAnos;

    if (event.target.checked && !selectedAnos.includes(event.target.value))
      _selectedAnos.push(event.target.value);
    else 
      _selectedAnos = _selectedAnos.filter((x) => x !== event.target.value);

    setSelectedAnos([..._selectedAnos]);
  }

  function handleSubmit() {
    setFormShow(false);
    setData(null);

    const execute = async () => {
      setData(
        await getProducaoOrigemAnimal(
          selectedAnos.map((x) => Number(x)),
          selectedProdutos,
          switchValue
        )
      );
    };
    execute();
  }

  return (
    <PageComponent title="Produção de Origem Animal">
      <div className="chart">
        <header>
          <strong>Produção de Origem Animal</strong>
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
                    value={selectedProdutos}
                    onChange={handleChangeSelectedRebanhos}
                    input={<Input />}
                  >
                    {produtos.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="form-line">
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
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Quantidade</Grid>
                    <Grid item>
                      <Switch
                        checked={switchValue}
                        onChange={() => {
                          setswitchValue(!switchValue);
                        }}
                        color="default"
                      />
                    </Grid>
                    <Grid item>Valor</Grid>
                  </Grid>
                </div>
              </FilterForm>
            </Collapse>
            <Collapse in={!formShow}>
              {!!data && !!data.datas ? (
                switchValue ? (
                  <BiaxialLineChart
                    data={data.datas}
                    xLabels={data.xLabels}
                    yAxisLabel={data.un}
                    tooltip
                    legend
                  />
                  ) : (
                  <BarsChart
                    data={data.datas}
                    xLabels={data.xLabels}
                    yAxisLabel={data.un}
                    tooltip
                    legend
                  />
                )
              ) : selectedAnos.length && selectedProdutos.length ? (
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
