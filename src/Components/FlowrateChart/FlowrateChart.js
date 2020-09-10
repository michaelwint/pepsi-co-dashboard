import React from 'react';
import { TimeSeries, Index } from "pondjs";
import data from "./data";
import { Container, Row, Col } from 'react-bootstrap'
import { Resizable, Charts, ChartContainer, ChartRow, YAxis, LineChart, Baseline, styler} from "react-timeseries-charts";

export default function FlowrateChart(props) {
    const series = new TimeSeries({
        name: "hilo_rainfall",
        columns: ["index", "value"],
        points: data.values.map(([d, value]) => [
          Index.getIndexString("1h", new Date(d)),
          value
        ])
      });
  
      console.log("series is ", series);
      const style = styler([
        {
          key: "value",
          color: props.color,
          width: 3
        }
      ]);

    return (
      <Container>
          <Row>
              <Col>
                  {props.title}
              </Col>
          </Row>
          <Row>
              <Col>
              <Resizable>
                <ChartContainer timeRange={series.range()}>
                  <ChartRow height="150">
                      <YAxis id="flowrate" label="Flowrate (m3/h)" width="70" type="linear" max={12} />
                      <Charts>
                        <LineChart
                            axis="flowrate"
                            style={style}
                            spacing={1}
                            columns={["value"]}
                            series={series}
                            minBarHeight={1}
                        />
                        <Baseline axis="flowrate" style={style} value={series.avg()} label="Avg"/>
                      </Charts>
                  </ChartRow>
                </ChartContainer>
              </Resizable>
              </Col>
          </Row>
      </Container>
    )
}