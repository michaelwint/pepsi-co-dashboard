import React from 'react';
import { TimeSeries, Index } from "pondjs";
import data from "./data";
import { Container, Row, Col } from 'react-bootstrap'
import { Resizable, Charts, ChartContainer, ChartRow, YAxis, LineChart, styler} from "react-timeseries-charts";

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
          color: "#A5C8E1",
          selected: "#2CB1CF",
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
                        <YAxis
                        id="rain"
                        label="Value"
                        width="70"
                        type="linear"
                        />
                        <Charts>
                        <LineChart
                            axis="rain"
                            style={style}
                            spacing={1}
                            columns={["value"]}
                            series={series}
                            minBarHeight={1}
                        />
                        </Charts>
                    </ChartRow>
                  </ChartContainer>
                </Resizable>
                </Col>
            </Row>
        </Container>

      )
}