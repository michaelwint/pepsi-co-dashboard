import React from 'react';
import { TimeSeries, Index } from "pondjs";
import { Container, Row, Col } from 'react-bootstrap'
import { Resizable, Charts, ChartContainer, ChartRow, YAxis, LineChart, Baseline, styler} from "react-timeseries-charts";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBContainer } from "mdbreact"
import './FlowrateChart.css';

export default function FlowrateChart(props) {
    const series = new TimeSeries({
        name: "flowrate_timeseries",
        columns: ["time", "value"],
        points: props.data.values.map(([d, value]) => [
          new Date(d).getTime(),
          value
        ])
      });

      const style = styler([
        {
          key: "value",
          color: props.color,
          width: 3
        }
      ]);

    return (
      <Container className="graph-chart-container">
        <MDBContainer>
                <MDBCard>
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
                      <YAxis id="flowrate" label="Flowrate (m3/h)" width="70" type="linear" max={props.data.maxVal} />
                      <Charts>
                        <LineChart
                            axis="flowrate"
                            style={style}
                            spacing={1}
                            columns={["value"]}
                            series={series}
                        />
                        <Baseline axis="flowrate" style={style} value={series.avg()} label="Avg"/>
                      </Charts>
                  </ChartRow>
                </ChartContainer>
              </Resizable>
              </Col>
          </Row>
          </MDBCard>
          </MDBContainer>
      </Container>
    )
}