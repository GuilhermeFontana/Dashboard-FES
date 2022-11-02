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
} from "@material-ui/core";
import { FilterList, Refresh } from "@material-ui/icons";
import { BiaxialLineChart } from "../components/BiaxialLineChart";
import { FilterForm } from "../components/FilterForm";
import { PageComponent } from "../components/PageComponent";
import { getOvinosTosquiados } from "../services/dataServices";
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

export function OvinosTosquiados() {
  const rebanhos = [
    "Brasil",
    "Norte",
    "Nordeste",
    "Centro-Oeste",
    "Sudeste",
    "Sul",
  ];
  const anos = ["2001", "2006", "2011", "2016", "2021"];

  const [data, setData] = React.useState<dataType>(null);
  const [formShow, setFormShow] = React.useState(true);
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>(
    []
  );
  const [selectedAnos, setSelectedAnos] = React.useState<string[]>([]);

  function handleChangeSelectedRebanhos(
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    setSelectedLocations(event.target.value as string[]);
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
        await getOvinosTosquiados(
          selectedAnos.map((x) => Number(x)),
          selectedLocations
        )
      );
    };
    execute();
  }

  return (
    <PageComponent title="Ovinos Tosquiados">
      <div className="chart">
        <header>
          <strong>Ovinos Tosquiados</strong>
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
                  <InputLabel id="demo-mutiple-name-label">
                    Localidade
                  </InputLabel>
                  <Select
                    multiple
                    value={selectedLocations}
                    onChange={handleChangeSelectedRebanhos}
                    input={<Input />}
                  >
                    {rebanhos.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
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
                <BiaxialLineChart
                  data={data.datas}
                  xLabels={data.xLabels}
                  tooltip
                  legend
                />
              ) : selectedAnos.length && selectedLocations.length ? (
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
