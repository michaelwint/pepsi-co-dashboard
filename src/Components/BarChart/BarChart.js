import React from 'react';
import { Resizable, Charts, ChartContainer, ChartRow, YAxis, BarChart as BaseBarChart, styler} from "react-timeseries-charts";
import { Container, Row, Col } from 'react-bootstrap'
import { TimeSeries, Index } from 'pondjs';
import Baseline from 'react-timeseries-charts/lib/components/Baseline';
import { MDBCard, MDBContainer } from "mdbreact"

export default function BarChart(props) {
    const data = [
        ["2017-01-24T00:00", 0.5],
        ["2017-01-25T02:00", 0.07],
        ["2017-01-26T21:00", 0.4],
        ["2017-01-27T22:00", 0.39],
        ["2017-01-28T23:00", -0.7]
    ];

    const series = new TimeSeries({
        name: "flowrate_timeseries",
        columns: ["index", "value"],
        points: data.map(([d, value]) => [
          Index.getIndexString("1h",new Date(d)),
          value
        ])
      });

    const style = styler([
        { key: "value", color: "#5208ff", width: "10px" },
    ]);

    return (
        <Container>
            <MDBContainer>
                <MDBCard>
                    <Row>
                        <Col>
                            <strong>{props.title}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Resizable>
                                <ChartContainer timeRange={series.range()} >
                                    <ChartRow height="150">
                                        <YAxis
                                            id="rain"
                                            label="Flowrate (m3/h)"
                                            width="70"
                                            type="linear"
                                            max={1}
                                            min={-1}
                                        />
                                        <Charts>
                                            <BaseBarChart
                                                axis="rain"
                                                style={style}
                                                spacing={1}
                                                columns={["value"]}
                                                series={series}
                                            />
                                            <Baseline axis="rain" style={style} value={0} />
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