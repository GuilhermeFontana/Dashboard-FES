import * as React from "react";
import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { FilterList, Refresh } from "@material-ui/icons";
import { PageComponent } from "../components/PageComponent";
import { FilterForm } from "../components/FilterForm";
import { BiaxialLineChart } from "../components/BiaxialLineChart";
import { getBiaxialLineChart } from "../services/service";
import "../styles/chart2.scss";

export function Chart2(props: any) {
  const selectValues = ["Opção 1", "Opção 2", "Opção 3", "Opção 4", "Opção 5"];
  const data = getBiaxialLineChart();

  const [formShow, setFormShow] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(event.target.value as string[]);
  };

  return (
    <PageComponent title="Gráfico 2">
      <div className="grid1">
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
                <div className="filter-row">
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
                        control={<Radio color="primary" />}
                        label="Opção 1"
                      />
                      <FormControlLabel
                        value="opcao2"
                        control={<Radio color="primary" />}
                        label="Opção 2"
                      />
                      <FormControlLabel
                        value="opcao3"
                        control={<Radio color="primary" />}
                        label="Opção 3"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel component="legend">Checkbox</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked
                            color="primary"
                            onChange={() => {}}
                            name="opcao1"
                          />
                        }
                        label="Opção 1"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            onChange={() => {}}
                            name="opcao2"
                          />
                        }
                        label="Opção 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked
                            color="primary"
                            onChange={() => {}}
                            name="opcao3"
                          />
                        }
                        label="Opção 3"
                      />
                    </FormGroup>
                  </FormControl>
              </div>
              </FilterForm>
            </Collapse>
            <Collapse in={!formShow}>
              <BiaxialLineChart
                data={data}
                xLabels={[]}
                xAxisLabel="Legenda de baixo"
                yAxisLabel="Legenda lateral"
                legend
                tooltip
              />
            </Collapse>
          </Box>
        </main>
      </div>
    </PageComponent>
  );
}
