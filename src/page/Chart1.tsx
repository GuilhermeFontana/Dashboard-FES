import * as React from "react";
import {
  Collapse,
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
} from "@material-ui/core";
import { FilterList, Refresh } from "@material-ui/icons";
import { BarsChart } from "../components/BarsChart";
import { FilterForm } from "../components/FilterForm";
import { PageComponent } from "../components/PageComponent";
import { getBarsChartDate } from "../services/service";
import "../styles/chart1.scss";

export function Chart1() {
  const selectValues = ["Opção 1", "Opção 2", "Opção 3", "Opção 4", "Opção 5"];
  const data = getBarsChartDate();

  const [formShow, setFormShow] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string[]);
  };

  return (
    <div>
      <PageComponent title="Gráfico 1">
        <div className="graph1">
          <header>
            <strong>Titulo</strong>
            <div className="actions">
              <FilterList
                color="primary"
                onClick={() => setFormShow(!formShow)}
              />
              <Refresh color="primary" />
            </div>
          </header>
          <main>
            <Box>
              <Collapse in={formShow}>
                <FilterForm onSubmit={() => {}}>
                  <FormControl>
                    <InputLabel id="demo-mutiple-name-label">Select</InputLabel>
                    <Select
                      multiple
                      value={selectValue}
                      onChange={handleChange}
                      input={<Input />}
                    >
                      {selectValues.map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Radio
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="opcao2"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="opcao1"
                        control={<Radio />}
                        label="Opção 1"
                      />
                      <FormControlLabel
                        value="opcao2"
                        control={<Radio />}
                        label="Opção 2"
                      />
                      <FormControlLabel
                        value="opcao3"
                        control={<Radio />}
                        label="Opção 3"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel component="legend">Checkbox</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox checked onChange={() => {}} name="opcao1" />
                        }
                        label="Opção 1"
                      />
                      <FormControlLabel
                        control={<Checkbox onChange={() => {}} name="opcao2" />}
                        label="Opção 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked onChange={() => {}} name="opcao3" />
                        }
                        label="Opção 3"
                      />
                    </FormGroup>
                  </FormControl>
                </FilterForm>
              </Collapse>
              <Collapse in={!formShow}>
                <BarsChart
                  data={data}
                  bars={[{ title: "Coluna 1" }, { title: "Coluna 2" }, {}]}
                  xAxisLabel="Legenda de baixo"
                  yAxisLabel="Legenda lateral"
                  legend
                />
              </Collapse>
            </Box>
          </main>
        </div>
      </PageComponent>
    </div>
  );
}
